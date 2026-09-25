import { AR, pipe, R } from "@mobily/ts-belt";
import { Resend } from "resend";

import { ContactEmail } from "../../src/emails/contact";
import { type ContactInput, contactSchema } from "../../src/lib/contact";
import { verifyTurnstile } from "../_lib/turnstile";

interface Env {
	RESEND_API_KEY: string;
	CONTACT_TO: string;
	CONTACT_FROM: string;
	CF_TURNSTILE_SECRET_KEY: string;
}

interface PagesContext {
	request: Request;
	env: Env;
}

interface ContactFailure {
	status: number;
	message: string;
}

const INVALID_MESSAGE: ContactFailure = {
	status: 400,
	message: "Invalid message.",
};

const NOT_VERIFIED: ContactFailure = {
	status: 403,
	message: "Could not verify the request.",
};

const SEND_FAILED: ContactFailure = {
	status: 502,
	message: "Could not send message.",
};

function parseContact(body: unknown) {
	return pipe(
		R.fromExecution(() => contactSchema.parse(body)),
		R.mapError(() => INVALID_MESSAGE),
	);
}

async function verifyHuman(
	context: PagesContext,
	body: unknown,
): AR.AsyncResult<unknown, ContactFailure> {
	const human = await verifyTurnstile(
		context.env.CF_TURNSTILE_SECRET_KEY,
		context.request,
		body,
	);
	if (!human) return R.Error(NOT_VERIFIED);
	return R.Ok(body);
}

async function sendContact(
	env: Env,
	input: ContactInput,
): AR.AsyncResult<ContactInput, ContactFailure> {
	if (input.company) return R.Ok(input);

	const resend = new Resend(env.RESEND_API_KEY);
	const response = await resend.emails
		.send({
			from: env.CONTACT_FROM,
			to: env.CONTACT_TO,
			replyTo: input.email,
			subject: "Hey, someone just sent you a message",
			react: (
				<ContactEmail
					name={input.name}
					email={input.email}
					message={input.message}
				/>
			),
		})
		.catch(() => null);

	if (!response || response.error) return R.Error(SEND_FAILED);
	return R.Ok(input);
}

export function onRequestPost(context: PagesContext) {
	return pipe(
		AR.make(context.request.json()),
		AR.mapError(() => INVALID_MESSAGE),
		AR.flatMap((body) => verifyHuman(context, body)),
		AR.fold(parseContact),
		AR.flatMap((input) => sendContact(context.env, input)),
		AR.match(
			() => Response.json({ ok: true }),
			(failure) =>
				Response.json({ error: failure.message }, { status: failure.status }),
		),
	);
}
