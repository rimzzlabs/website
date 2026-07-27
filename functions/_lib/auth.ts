import { betterAuth } from "better-auth";
import type { AuthorType, GuestbookEnv } from "./guestbook";

export function createAuth(env: GuestbookEnv, baseURL: string) {
	return betterAuth({
		// D1 binding — better-auth detects it and uses its native D1 dialect.
		database: env.DB as never,
		secret: env.SESSION_SECRET,
		baseURL,
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID ?? "",
				clientSecret: env.GITHUB_CLIENT_SECRET ?? "",
			},
			google: {
				clientId: env.GOOGLE_CLIENT_ID ?? "",
				clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
			},
		},
	});
}

export type SessionUser = { id: string; name: string; image: string | null };

export async function getSessionUser(
	request: Request,
	env: GuestbookEnv,
): Promise<SessionUser | null> {
	// No better-auth cookie → anonymous; skip constructing better-auth entirely.
	if (!request.headers.get("cookie")?.includes("better-auth")) return null;
	const auth = createAuth(env, new URL(request.url).origin);
	const result = await auth.api.getSession({ headers: request.headers });
	if (!result?.user) return null;
	return { id: result.user.id, name: result.user.name, image: result.user.image ?? null };
}

export async function getUserProvider(env: GuestbookEnv, userId: string): Promise<AuthorType> {
	const row = await env.DB.prepare(
		"SELECT providerId FROM account WHERE userId = ? ORDER BY createdAt LIMIT 1",
	)
		.bind(userId)
		.first<{ providerId: string }>();
	return row?.providerId === "google" ? "google" : "github";
}
