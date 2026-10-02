import { A, AR, pipe, R } from "@mobily/ts-belt";

import { FeedbackEmail } from "../../src/emails/feedback";
import { en } from "../../src/i18n/en";
import {
	checkAttachment,
	createFeedbackSchema,
	type FeedbackInput,
	IMAGE_CONTENT_TYPES,
	type ImageType,
	MAX_ATTACHMENT_BYTES,
	MAX_ATTACHMENTS,
} from "../../src/lib/feedback";
import { type NotifyEnv, sendNotification } from "../_lib/notify";
import { verifyTurnstile } from "../_lib/turnstile";

interface Env extends NotifyEnv {
	CF_TURNSTILE_SECRET_KEY: string;
}

interface PagesContext {
	request: Request;
	env: Env;
}

interface FeedbackFailure {
	status: number;
	message: string;
}

interface Attachment {
	filename: string;
	content: string;
	contentType: string;
	contentId: string;
}

interface Feedback {
	input: FeedbackInput;
	attachments: ReadonlyArray<Attachment>;
}

const INVALID_FEEDBACK: FeedbackFailure = {
	status: 400,
	message: "Invalid feedback.",
};

const INVALID_ATTACHMENT: FeedbackFailure = {
	status: 400,
	message: "Attachments must be PNG, JPEG, or WebP images under 4 MB.",
};

const TOO_LARGE: FeedbackFailure = {
	status: 413,
	message: "The request is too large.",
};

const NOT_VERIFIED: FeedbackFailure = {
	status: 403,
	message: "Could not verify the request.",
};

const SEND_FAILED: FeedbackFailure = {
	status: 502,
	message: "Could not send feedback.",
};

// Room for every attachment at full size plus the text fields.
const MAX_REQUEST_BYTES = MAX_ATTACHMENTS * MAX_ATTACHMENT_BYTES + 64 * 1024;

const FILE_EXTENSIONS: Record<ImageType, string> = {
	png: "png",
	jpeg: "jpg",
	webp: "webp",
};

const feedbackSchema = createFeedbackSchema(en.feedback.validation);

function readText(form: FormData, key: string) {
	const value = form.get(key);
	if (typeof value !== "string") return "";
	return value;
}

async function readForm(
	request: Request,
): AR.AsyncResult<FormData, FeedbackFailure> {
	const length = Number(request.headers.get("content-length") ?? 0);
	if (length > MAX_REQUEST_BYTES) return R.Error(TOO_LARGE);

	const form = await request.formData().catch(() => null);
	if (!form) return R.Error(INVALID_FEEDBACK);
	return R.Ok(form);
}

async function verifyHuman(
	context: PagesContext,
	form: FormData,
): AR.AsyncResult<FormData, FeedbackFailure> {
	const human = await verifyTurnstile(
		context.env.CF_TURNSTILE_SECRET_KEY,
		context.request,
		{ token: readText(form, "token") },
	);
	if (!human) return R.Error(NOT_VERIFIED);
	return R.Ok(form);
}

async function toAttachment(
	file: File,
	index: number,
): Promise<Attachment | null> {
	const check = await checkAttachment(file);
	if (!check.ok) return null;

	const bytes = new Uint8Array(await file.arrayBuffer());
	const name = `screenshot-${index + 1}`;
	return {
		// The name comes from the detected type, never from the upload.
		filename: `${name}.${FILE_EXTENSIONS[check.type]}`,
		content: Buffer.from(bytes).toString("base64"),
		contentType: IMAGE_CONTENT_TYPES[check.type],
		// A content ID makes Resend send the file inline, so the email body
		// can paint it with a cid: URL.
		contentId: name,
	};
}

async function parseFeedback(
	form: FormData,
): AR.AsyncResult<Feedback, FeedbackFailure> {
	const parsed = feedbackSchema.safeParse({
		topic: readText(form, "topic"),
		page: readText(form, "page"),
		message: readText(form, "message"),
		environment: readText(form, "environment"),
		name: readText(form, "name"),
		email: readText(form, "email"),
		company: readText(form, "company"),
	});
	if (!parsed.success) return R.Error(INVALID_FEEDBACK);

	const files = pipe(
		form.getAll("attachments"),
		A.filter((value): value is File => value instanceof File),
	);
	if (files.length > MAX_ATTACHMENTS) return R.Error(INVALID_ATTACHMENT);

	const attachments = await Promise.all(files.map(toAttachment));
	if (attachments.some((attachment) => attachment === null)) {
		return R.Error(INVALID_ATTACHMENT);
	}

	return R.Ok({
		input: parsed.data,
		attachments: attachments.filter(
			(attachment): attachment is Attachment => attachment !== null,
		),
	});
}

async function sendFeedback(
	env: Env,
	feedback: Feedback,
): AR.AsyncResult<Feedback, FeedbackFailure> {
	if (feedback.input.company) return R.Ok(feedback);

	const input = feedback.input;
	const topic = en.feedback.topics[input.topic];
	const sent = await sendNotification(env, {
		replyTo: input.email || undefined,
		subject: `New feedback: ${topic}`,
		attachments: feedback.attachments,
		react: (
			<FeedbackEmail
				topic={topic}
				page={input.page}
				message={input.message}
				environment={input.environment}
				name={input.name}
				email={input.email}
				screenshots={feedback.attachments.map((attachment) => ({
					name: attachment.filename,
					src: `cid:${attachment.contentId}`,
				}))}
			/>
		),
	});

	if (!sent) return R.Error(SEND_FAILED);
	return R.Ok(feedback);
}

export function onRequestPost(context: PagesContext) {
	return pipe(
		readForm(context.request),
		AR.flatMap((form) => verifyHuman(context, form)),
		AR.flatMap(parseFeedback),
		AR.flatMap((feedback) => sendFeedback(context.env, feedback)),
		AR.match(
			() => Response.json({ ok: true }),
			(failure) =>
				Response.json({ error: failure.message }, { status: failure.status }),
		),
	);
}
