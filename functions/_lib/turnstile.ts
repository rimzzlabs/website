import { z } from "zod";

const SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

const tokenSchema = z.object({ token: z.string().min(1) });

export async function verifyTurnstile(
	secret: string,
	request: Request,
	body: unknown,
) {
	const parsed = tokenSchema.safeParse(body);
	if (!parsed.success) return false;

	const form = new FormData();
	form.append("secret", secret);
	form.append("response", parsed.data.token);
	const ip = request.headers.get("cf-connecting-ip");
	if (ip) form.append("remoteip", ip);

	const response = await fetch(SITEVERIFY_URL, {
		method: "POST",
		body: form,
	}).catch(() => null);
	if (!response?.ok) return false;

	const result = (await response.json().catch(() => ({}))) as {
		success?: boolean;
	};
	return result.success === true;
}
