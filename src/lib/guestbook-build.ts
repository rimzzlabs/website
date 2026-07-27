import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } from "astro:env/server";
import { readFileSync } from "node:fs";
import type { AuthorType, GuestbookComment, GuestbookPage } from "./guestbook-schema";

const EMPTY: GuestbookPage = { items: [], nextOffset: null };

type D1Row = {
	id: number;
	name: string;
	site: string | null;
	message: string;
	createdAt: number;
	updatedAt: number | null;
	authorType: AuthorType;
	avatar: string | null;
};

// Reuse the D1 id from the runtime binding in wrangler.jsonc rather than a
// duplicate env var.
function readDatabaseId(): string | undefined {
	try {
		return readFileSync("wrangler.jsonc", "utf8").match(/"database_id"\s*:\s*"([^"]+)"/)?.[1];
	} catch {
		return undefined;
	}
}

// Read the most recent comments at build time so the static HTML is crawlable.
// No viewer at build, so isOwn is always false (the island refetches on mount
// to restore per-visitor state). Any failure falls back to an empty page.
export async function getRecentCommentsAtBuild(limit: number): Promise<GuestbookPage> {
	const databaseId = readDatabaseId();
	if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN || !databaseId) return EMPTY;

	try {
		const res = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${databaseId}/query`,
			{
				method: "POST",
				headers: {
					authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					sql: "SELECT id, name, site, message, created_at AS createdAt, updated_at AS updatedAt, author_type AS authorType, avatar_url AS avatar FROM comments ORDER BY id DESC LIMIT ?",
					params: [limit + 1],
				}),
			},
		);
		if (!res.ok) return EMPTY;

		const data = (await res.json()) as { result?: Array<{ results?: D1Row[] }> };
		const rows = data.result?.[0]?.results ?? [];
		const hasMore = rows.length > limit;
		const items: GuestbookComment[] = (hasMore ? rows.slice(0, limit) : rows).map((row) => ({
			id: row.id,
			name: row.name,
			site: row.site,
			message: row.message,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt ?? null,
			authorType: row.authorType,
			avatar: row.avatar ?? null,
			isOwn: false,
		}));
		return { items, nextOffset: hasMore ? limit : null };
	} catch {
		return EMPTY;
	}
}
