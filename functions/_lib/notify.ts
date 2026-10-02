import type { ReactElement } from "react";
import { type Attachment, Resend } from "resend";

export interface NotifyEnv {
	RESEND_API_KEY: string;
	CONTACT_FROM: string;
	CONTACT_TO: string;
}

export interface EmailContent {
	subject: string;
	react: ReactElement;
	replyTo?: string;
	attachments?: ReadonlyArray<Attachment>;
}

export interface Email extends EmailContent {
	to: string;
}

export async function sendEmail(env: NotifyEnv, email: Email) {
	const resend = new Resend(env.RESEND_API_KEY);
	const response = await resend.emails
		.send({
			from: env.CONTACT_FROM,
			to: email.to,
			replyTo: email.replyTo,
			subject: email.subject,
			attachments: email.attachments && [...email.attachments],
			react: email.react,
		})
		.catch(() => null);

	return Boolean(response && !response.error);
}

export function sendNotification(env: NotifyEnv, content: EmailContent) {
	return sendEmail(env, { ...content, to: env.CONTACT_TO });
}
