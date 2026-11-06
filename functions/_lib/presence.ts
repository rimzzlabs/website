import {
	type Presence,
	type PresenceRow,
	toPresence,
} from "../../src/lib/presence";
import type { D1Database } from "./guestbook";

export interface PresenceEnv {
	DB: D1Database;
	PRESENCE_TOKEN?: string;
}

const CACHE_SECONDS = 30;
const CACHE_KEY = "https://presence.internal/v1";

function cache() {
	return (caches as unknown as { default: Cache }).default;
}

async function readRow(db: D1Database) {
	return db
		.prepare("SELECT enabled, last_seen_at FROM presence WHERE id = 1")
		.first<PresenceRow>();
}

// The cache stores the raw row, not the status, so "online" turns into
// "away" on time even when the row comes from the cache.
export async function readPresenceRow(params: {
	env: PresenceEnv;
	waitUntil(promise: Promise<unknown>): void;
}): Promise<PresenceRow | null> {
	const cached = await cache().match(CACHE_KEY);
	if (cached) return (await cached.json()) as PresenceRow | null;

	const row = await readRow(params.env.DB);
	const response = Response.json(row, {
		headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
	});
	params.waitUntil(cache().put(CACHE_KEY, response));
	return row;
}

export async function readPresence(params: {
	env: PresenceEnv;
	waitUntil(promise: Promise<unknown>): void;
}): Promise<Presence> {
	const row = await readPresenceRow(params);
	return toPresence(row, Date.now());
}

export function clearPresenceCache() {
	return cache().delete(CACHE_KEY);
}

export async function writePresence(params: {
	db: D1Database;
	action: "on" | "off" | "ping";
	now: number;
}) {
	if (params.action === "ping") {
		await params.db
			.prepare(
				"UPDATE presence SET last_seen_at = ? WHERE id = 1 AND enabled = 1",
			)
			.bind(params.now)
			.run();
	} else {
		await params.db
			.prepare("UPDATE presence SET enabled = ?, last_seen_at = ? WHERE id = 1")
			.bind(params.action === "on" ? 1 : 0, params.now)
			.run();
	}
	return readRow(params.db);
}
