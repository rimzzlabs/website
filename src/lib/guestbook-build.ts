import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } from "astro:env/server";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import type { AuthorType, GuestbookComment, GuestbookPage } from "./guestbook-schema";

const EMPTY: GuestbookPage = { items: [], nextOffset: null };
const LOCAL_D1_DIR = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
const SELECT =
	"SELECT id, name, site, message, created_at AS createdAt, updated_at AS updatedAt, author_type AS authorType, avatar_url AS avatar FROM comments ORDER BY id DESC LIMIT ?";

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

function toPage(rows: D1Row[], limit: number): GuestbookPage {
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
}

function readDatabaseId(): string | undefined {
	try {
		return readFileSync("wrangler.jsonc", "utf8").match(/"database_id"\s*:\s*"([^"]+)"/)?.[1];
	} catch {
		return undefined;
	}
}

// Local dev: read the wrangler local D1 sqlite directly so `guestbook:preview`
// bakes the comments you posted locally.
async function readLocalD1(limit: number): Promise<GuestbookPage | null> {
	if (!existsSync(LOCAL_D1_DIR)) return null;
	const files = readdirSync(LOCAL_D1_DIR).filter(
		(file) => file.endsWith(".sqlite") && file !== "metadata.sqlite",
	);
	if (files.length === 0) return null;

	const { DatabaseSync } = await import("node:sqlite");
	for (const file of files) {
		try {
			const db = new DatabaseSync(`${LOCAL_D1_DIR}/${file}`, { readOnly: true });
			const rows = db.prepare(SELECT).all(limit + 1) as unknown as D1Row[];
			db.close();
			return toPage(rows, limit);
		} catch {
			// this sqlite file has no comments table (e.g. a cache db) — try the next
		}
	}
	return null;
}

// CI / production: read over the D1 REST API (the id comes from wrangler.jsonc).
async function readRemoteD1(limit: number): Promise<GuestbookPage> {
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
				body: JSON.stringify({ sql: SELECT, params: [limit + 1] }),
			},
		);
		if (!res.ok) return EMPTY;
		const data = (await res.json()) as { result?: Array<{ results?: D1Row[] }> };
		return toPage(data.result?.[0]?.results ?? [], limit);
	} catch {
		return EMPTY;
	}
}

// Read recent comments at build so the static HTML is crawlable — local D1 in
// dev, the REST API in CI. No viewer at build, so isOwn is always false (the
// island refetches on mount to restore per-visitor state).
export async function getRecentCommentsAtBuild(limit: number): Promise<GuestbookPage> {
	const local = await readLocalD1(limit);
	if (local) return local;
	return readRemoteD1(limit);
}
