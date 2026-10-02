import {
	noteSlugSchema,
	type ReactionState,
} from "../../../src/lib/reactions/schema";
import { notifyNoteHeart } from "../../_lib/activity";
import type { D1Database } from "../../_lib/guestbook";
import type { NotifyEnv } from "../../_lib/notify";

interface ReactionEnv extends NotifyEnv {
	DB: D1Database;
	ASSETS: { fetch: (input: string) => Promise<Response> };
}

interface ReactionContext {
	request: Request;
	params: { slug: string };
	env: ReactionEnv;
	waitUntil(promise: Promise<unknown>): void;
}

const VISITOR_COOKIE = "rimzzlabs_visitor";
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const VISITOR_ID = /^[0-9a-f-]{36}$/;

function readVisitor(request: Request) {
	const cookies = request.headers.get("cookie") ?? "";
	const match = cookies.match(
		new RegExp(`(?:^|;\\s*)${VISITOR_COOKIE}=([^;]+)`),
	);
	const id = match?.[1];
	return id && VISITOR_ID.test(id) ? id : null;
}

function visitorCookie(id: string) {
	return `${VISITOR_COOKIE}=${id}; Path=/api/reactions; Max-Age=${VISITOR_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
}

async function readState(params: {
	db: D1Database;
	slug: string;
	visitor: string | null;
}): Promise<ReactionState> {
	const total = await params.db
		.prepare("SELECT COUNT(*) AS count FROM note_reactions WHERE slug = ?")
		.bind(params.slug)
		.first<{ count: number }>();
	const mine = params.visitor
		? await params.db
				.prepare(
					"SELECT 1 AS found FROM note_reactions WHERE slug = ? AND visitor = ?",
				)
				.bind(params.slug, params.visitor)
				.first<{ found: number }>()
		: null;
	return { count: total?.count ?? 0, reacted: mine !== null };
}

function json(body: unknown, init?: { status?: number; cookie?: string }) {
	const headers = new Headers({ "Cache-Control": "no-store" });
	if (init?.cookie) headers.set("Set-Cookie", init.cookie);
	return Response.json(body, { status: init?.status ?? 200, headers });
}

export async function onRequestGet(context: ReactionContext) {
	const slug = noteSlugSchema.safeParse(context.params.slug);
	if (!slug.success) return json({ error: "Invalid note." }, { status: 400 });
	const state = await readState({
		db: context.env.DB,
		slug: slug.data,
		visitor: readVisitor(context.request),
	});
	return json(state);
}

// Toggles the visitor's heart on a note. A first-time visitor gets a random
// anonymous ID in a cookie, so each visitor counts once per note.
export async function onRequestPost(context: ReactionContext) {
	const slug = noteSlugSchema.safeParse(context.params.slug);
	if (!slug.success) return json({ error: "Invalid note." }, { status: 400 });

	// Only real notes can collect hearts. Local dev serves the API next to
	// public/ only, without the built notes, so the check runs off localhost.
	const url = new URL(context.request.url);
	if (url.hostname !== "localhost") {
		const page = await context.env.ASSETS.fetch(
			new URL(`/notes/${slug.data}/`, url).toString(),
		);
		if (page.status !== 200)
			return json({ error: "Note not found." }, { status: 404 });
	}

	const known = readVisitor(context.request);
	const visitor = known ?? crypto.randomUUID();
	const db = context.env.DB;

	const removed = await db
		.prepare("DELETE FROM note_reactions WHERE slug = ? AND visitor = ?")
		.bind(slug.data, visitor)
		.run();
	if (removed.meta.changes === 0) {
		await db
			.prepare(
				"INSERT OR IGNORE INTO note_reactions (slug, visitor, created_at) VALUES (?, ?, ?)",
			)
			.bind(slug.data, visitor, Date.now())
			.run();
	}

	const state = await readState({ db, slug: slug.data, visitor });
	if (removed.meta.changes === 0 && state.reacted) {
		context.waitUntil(
			notifyNoteHeart(context.env, {
				origin: url.origin,
				slug: slug.data,
				visitor,
				count: state.count,
			}),
		);
	}
	return json(state, { cookie: known ? undefined : visitorCookie(visitor) });
}
