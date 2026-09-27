export interface D1PreparedStatement {
	bind(...values: unknown[]): D1PreparedStatement;
	first<T = unknown>(): Promise<T | null>;
	all<T = unknown>(): Promise<{ results: T[] }>;
	run(): Promise<{ meta: { last_row_id: number; changes: number } }>;
}

export interface D1Database {
	prepare(query: string): D1PreparedStatement;
}

export interface GuestbookEnv {
	DB: D1Database;
	SESSION_SECRET: string;
	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
	CF_TURNSTILE_SECRET_KEY: string;
	PAGES_DEPLOY_HOOK_URL?: string;
}

export interface PagesContext {
	request: Request;
	env: GuestbookEnv;
	waitUntil(promise: Promise<unknown>): void;
}

const REBUILD_LOCK_URL = "https://guestbook.internal/rebuild-lock";
const REBUILD_DEBOUNCE_SECONDS = 60;

export async function triggerRebuild(env: GuestbookEnv) {
	if (!env.PAGES_DEPLOY_HOOK_URL) return;

	const cache = (caches as unknown as { default: Cache }).default;
	if (await cache.match(REBUILD_LOCK_URL)) return;

	await cache.put(
		REBUILD_LOCK_URL,
		new Response(null, {
			headers: { "cache-control": `max-age=${REBUILD_DEBOUNCE_SECONDS}` },
		}),
	);
	await fetch(env.PAGES_DEPLOY_HOOK_URL, { method: "POST" }).catch(() => null);
}
