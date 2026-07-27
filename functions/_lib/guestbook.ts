export interface D1Result<T> {
	results: T[];
}
export interface D1RunResult {
	meta: { last_row_id: number; changes: number };
}
export interface D1PreparedStatement {
	bind(...values: unknown[]): D1PreparedStatement;
	first<T = unknown>(colName?: string): Promise<T | null>;
	all<T = unknown>(): Promise<D1Result<T>>;
	run(): Promise<D1RunResult>;
}
export interface D1Database {
	prepare(query: string): D1PreparedStatement;
}

export interface GuestbookEnv {
	DB: D1Database;
	SESSION_SECRET: string;
	GITHUB_CLIENT_ID?: string;
	GITHUB_CLIENT_SECRET?: string;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
	RESEND_KEY: string;
	CF_TURNSTILE_SECRET_KEY: string;
	GUESTBOOK_FROM_EMAIL?: string;
	GUESTBOOK_NOTIFY_TO?: string;
	CONTACT_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
	PAGES_DEPLOY_HOOK_URL?: string;
}

export type AuthorType = "anon" | "github" | "google";

export interface CommentRow {
	id: number;
	name: string;
	site: string | null;
	message: string;
	createdAt: number;
	updatedAt: number | null;
	author_type: AuthorType;
	author_id: string | null;
	avatar_url: string | null;
	owner_hash: string | null;
}

export type GuestbookCommentDTO = {
	id: number;
	name: string;
	site: string | null;
	message: string;
	createdAt: number;
	updatedAt: number | null;
	authorType: AuthorType;
	avatar: string | null;
	isOwn: boolean;
};

export type Viewer = { ownerHash: string | null; sub: string | null };

export const COMMENT_COLUMNS =
	"id, name, site, message, created_at AS createdAt, updated_at AS updatedAt, author_type, author_id, avatar_url, owner_hash";

const OWNER_COOKIE = "gb_owner";
const OWNER_MAX_AGE = 60 * 60 * 24 * 365;

export function json(data: unknown, status: number, headers?: Record<string, string>): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "content-type": "application/json", ...headers },
	});
}

export function normalizeSite(raw: string | undefined): string | null {
	const site = raw?.trim();
	if (!site) return null;
	return /^https?:\/\//i.test(site) ? site : `https://${site}`;
}

export function readOwnerToken(request: Request): string | null {
	const match = request.headers.get("cookie")?.match(/(?:^|;\s*)gb_owner=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : null;
}

export function mintOwnerToken(): string {
	return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

export async function hashOwnerToken(token: string): Promise<string> {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
	return toHex(new Uint8Array(digest));
}

export function ownerSetCookie(token: string): string {
	return `${OWNER_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${OWNER_MAX_AGE}`;
}

export function ownsComment(row: CommentRow, viewer: Viewer): boolean {
	if (row.owner_hash != null && row.owner_hash === viewer.ownerHash) return true;
	return row.author_id != null && viewer.sub != null && row.author_id === viewer.sub;
}

export function toComment(row: CommentRow, viewer: Viewer): GuestbookCommentDTO {
	return {
		id: row.id,
		name: row.name,
		site: row.site,
		message: row.message,
		createdAt: row.createdAt,
		updatedAt: row.updatedAt,
		authorType: row.author_type,
		avatar: row.avatar_url,
		isOwn: ownsComment(row, viewer),
	};
}

function toHex(bytes: Uint8Array): string {
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

const REBUILD_LOCK = "https://guestbook.internal/rebuild-lock";

// Ping the Pages deploy hook so the baked (crawlable) comment snapshot refreshes
// after a write. Debounced via the edge cache so a burst can't spam rebuilds.
export async function triggerRebuild(env: GuestbookEnv): Promise<void> {
	if (!env.PAGES_DEPLOY_HOOK_URL) return;
	const cache = (caches as unknown as { default: Cache }).default;
	if (await cache.match(REBUILD_LOCK)) return;
	await cache.put(REBUILD_LOCK, new Response(null, { headers: { "cache-control": "max-age=60" } }));
	try {
		await fetch(env.PAGES_DEPLOY_HOOK_URL, { method: "POST" });
	} catch (error) {
		console.error("Guestbook rebuild trigger failed:", error);
	}
}
