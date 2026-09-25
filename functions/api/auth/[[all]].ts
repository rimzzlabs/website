import { createAuth } from "../../_lib/auth";
import type { PagesContext } from "../../_lib/guestbook";

export function onRequest(context: PagesContext) {
	const auth = createAuth(context.env, new URL(context.request.url).origin);
	return auth.handler(context.request);
}
