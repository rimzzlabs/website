import { Resend } from "resend";
import { sanitizeHtml } from "../_lib/sanitize-html";

// Cloudflare Pages Function backing the contact form (POST /api/contact). The
// site is static, so delivery runs here at the edge: validate → verify Turnstile
// → sanitize the rich-text body → send via Resend. Secrets are set in the Pages
// project (and a local `.dev.vars` for `wrangler pages dev`).
interface ContactEnv {
	RESEND_KEY: string;
	CONTACT_TO_EMAIL: string;
	CONTACT_FROM_EMAIL: string;
	CF_TURNSTILE_SECRET_KEY: string;
}

interface ContactContext {
	request: Request;
	env: ContactEnv;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, subject: 200, body: 20_000 };

function json(data: unknown, status: number): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "content-type": "application/json" },
	});
}

function asString(value: unknown): string {
	return typeof value === "string" ? value : "";
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
	const form = new FormData();
	form.append("secret", secret);
	form.append("response", token);
	if (ip) form.append("remoteip", ip);

	const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		body: form,
	});
	const result = (await response.json()) as { success?: boolean };
	return result.success === true;
}

export async function onRequestPost(context: ContactContext): Promise<Response> {
	const { request, env } = context;

	let payload: Record<string, unknown>;
	try {
		payload = (await request.json()) as Record<string, unknown>;
	} catch {
		return json({ error: "invalid_json" }, 400);
	}

	const name = asString(payload.name).trim();
	const email = asString(payload.email).trim();
	const subject = asString(payload.subject).trim();
	const bodyHtml = asString(payload.bodyHtml);
	const bodyText = asString(payload.bodyText).trim();
	const token = asString(payload.token);

	const invalid =
		!name ||
		name.length > LIMITS.name ||
		!EMAIL_RE.test(email) ||
		email.length > LIMITS.email ||
		!subject ||
		subject.length > LIMITS.subject ||
		!bodyText ||
		bodyHtml.length > LIMITS.body ||
		!token;
	if (invalid) return json({ error: "invalid_input" }, 400);

	const human = await verifyTurnstile(
		env.CF_TURNSTILE_SECRET_KEY,
		token,
		request.headers.get("cf-connecting-ip"),
	);
	if (!human) return json({ error: "turnstile_failed" }, 403);

	const safeBody = await sanitizeHtml(bodyHtml);
	const html = `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>${safeBody}`;
	const text = `From: ${name} <${email}>\n\n${bodyText}`;

	const resend = new Resend(env.RESEND_KEY);
	const { error } = await resend.emails.send({
		from: env.CONTACT_FROM_EMAIL,
		to: env.CONTACT_TO_EMAIL,
		replyTo: email,
		subject,
		html,
		text,
	});
	if (error) {
		console.error("Resend send failed:", error);
		return json({ error: "send_failed", detail: error.message }, 502);
	}

	return json({ ok: true }, 200);
}
