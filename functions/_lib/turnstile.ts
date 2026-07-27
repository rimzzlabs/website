export async function verifyTurnstile(
	secret: string,
	token: string,
	ip: string | null,
): Promise<boolean> {
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
