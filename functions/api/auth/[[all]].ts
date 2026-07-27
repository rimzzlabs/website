import { createAuth } from "../../_lib/auth";
import type { GuestbookEnv } from "../../_lib/guestbook";

interface Context {
	request: Request;
	env: GuestbookEnv;
}

export function onRequest(context: Context): Response | Promise<Response> {
	const auth = createAuth(context.env, new URL(context.request.url).origin);
	return auth.handler(context.request);
}
