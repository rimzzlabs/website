import { AR, pipe, R } from "@mobily/ts-belt";

import { ContactEmail } from "../../src/emails/contact";
import { ContactReplyEmail } from "../../src/emails/contact-reply";
import { getDictionary, HTML_LANG, toLocale } from "../../src/i18n";
import { en } from "../../src/i18n/en";
import { type ContactInput, createContactSchema } from "../../src/lib/contact";
import { type NotifyEnv, sendEmail, sendNotification } from "../_lib/notify";
import { verifyTurnstile } from "../_lib/turnstile";

interface Env extends NotifyEnv {
	CF_TURNSTILE_SECRET_KEY: string;
}

interface PagesContext {
	request: Request;
	env: Env;
	waitUntil(promise: Promise<unknown>): void;
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

const contactSchema = createContactSchema(en.contact.validation);

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

	const sent = await sendNotification(env, {
		replyTo: input.email,
		subject: "Hey, someone just sent you a message",
		react: (
			<ContactEmail
				name={input.name}
				email={input.email}
				message={input.message}
			/>
		),
	});

	if (!sent) return R.Error(SEND_FAILED);
	return R.Ok(input);
}

function replyToSender(env: Env, input: ContactInput) {
	const locale = toLocale(input.locale);
	const copy = getDictionary(locale).contact.autoReply;

	return sendEmail(env, {
		to: input.email,
		subject: copy.subject,
		react: (
			<ContactReplyEmail
				copy={copy}
				lang={HTML_LANG[locale]}
				name={input.name}
			/>
		),
	});
}

export function onRequestPost(context: PagesContext) {
	return pipe(
		AR.make(context.request.json()),
		AR.mapError(() => INVALID_MESSAGE),
		AR.flatMap((body) => verifyHuman(context, body)),
		AR.fold(parseContact),
		AR.flatMap((input) => sendContact(context.env, input)),
		AR.tap((input) => {
			if (input.company) return;
			context.waitUntil(replyToSender(context.env, input));
		}),
		AR.match(
			() => Response.json({ ok: true }),
			(failure) =>
				Response.json({ error: failure.message }, { status: failure.status }),
		),
	);
}
