import type { GuestbookEnv } from "../_lib/guestbook";

interface HealthContext {
	env: GuestbookEnv;
}

const HTTP_STATUS: Record<string, number> = { ok: 200, down: 503 };

export async function onRequestGet(context: HealthContext) {
	const database = await context.env.DB.prepare("SELECT 1")
		.first()
		.then(() => "ok")
		.catch(() => "down");
	return Response.json({ status: database }, { status: HTTP_STATUS[database] });
}
