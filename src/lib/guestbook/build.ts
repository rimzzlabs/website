import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } from "astro:env/server";
import { readFileSync } from "node:fs";
import { AR, pipe } from "@mobily/ts-belt";

import {
	EMPTY_GUESTBOOK_PAGE,
	GUESTBOOK_PAGE_SIZE,
	GUESTBOOK_SELECT,
	type GuestbookEntry,
	type GuestbookPage,
	toGuestbookPage,
} from "@/lib/guestbook/schema";

interface D1QueryResponse {
	result?: Array<{ results?: GuestbookEntry[] }>;
}

function readDatabaseId() {
	const config = readFileSync("wrangler.jsonc", "utf8");
	return config.match(/"database_id"\s*:\s*"([^"]+)"/)?.[1];
}

async function queryD1(databaseId: string) {
	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${databaseId}/query`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				sql: GUESTBOOK_SELECT,
				params: [Number.MAX_SAFE_INTEGER, GUESTBOOK_PAGE_SIZE + 1],
			}),
		},
	);
	if (!response.ok) throw new Error(`D1 query failed: ${response.status}`);

	const data = (await response.json()) as D1QueryResponse;
	return data.result?.[0]?.results ?? [];
}

export function getGuestbookAtBuild(): Promise<GuestbookPage> {
	if (import.meta.env.DEV) return Promise.resolve(EMPTY_GUESTBOOK_PAGE);

	const databaseId = readDatabaseId();
	if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN || !databaseId) {
		return Promise.resolve(EMPTY_GUESTBOOK_PAGE);
	}

	return pipe(
		AR.make(queryD1(databaseId)),
		AR.map((rows) => toGuestbookPage(rows, GUESTBOOK_PAGE_SIZE)),
		AR.tapError((error) => {
			console.info("Failed to read the guestbook at build", error);
		}),
		AR.getWithDefault(EMPTY_GUESTBOOK_PAGE),
	);
}
