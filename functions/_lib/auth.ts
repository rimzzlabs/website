import { betterAuth } from "better-auth";

import type { GuestbookEnv } from "./guestbook";

export interface SessionUser {
	id: string;
	name: string;
	image: string | null;
}

export function createAuth(env: GuestbookEnv, baseURL: string) {
	return betterAuth({
		database: env.DB as never,
		secret: env.SESSION_SECRET,
		baseURL,
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID,
				clientSecret: env.GITHUB_CLIENT_SECRET,
			},
		},
	});
}

export async function getSessionUser(
	request: Request,
	env: GuestbookEnv,
): Promise<SessionUser | null> {
	if (!request.headers.get("cookie")?.includes("better-auth")) return null;

	const auth = createAuth(env, new URL(request.url).origin);
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session?.user) return null;

	return {
		id: session.user.id,
		name: session.user.name,
		image: session.user.image ?? null,
	};
}
