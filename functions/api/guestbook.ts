import { Resend } from "resend";
import {
	API_VALIDATION,
	guestbookInputSchema,
	guestbookQuerySchema,
	guestbookVerifiedSchema,
} from "../../src/lib/guestbook-schema";
import { getSessionUser, getUserProvider } from "../_lib/auth";
import {
	COMMENT_COLUMNS,
	type CommentRow,
	type GuestbookCommentDTO,
	type GuestbookEnv,
	hashOwnerToken,
	json,
	mintOwnerToken,
	normalizeSite,
	ownerSetCookie,
	readOwnerToken,
	toComment,
	triggerRebuild,
} from "../_lib/guestbook";
import { verifyTurnstile } from "../_lib/turnstile";

interface FunctionContext {
	request: Request;
	env: GuestbookEnv;
	waitUntil(promise: Promise<unknown>): void;
}

const inputSchema = guestbookInputSchema(API_VALIDATION);
const verifiedSchema = guestbookVerifiedSchema(API_VALIDATION);

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

async function notify(env: GuestbookEnv, comment: GuestbookCommentDTO): Promise<void> {
	const from = env.GUESTBOOK_FROM_EMAIL || env.CONTACT_FROM_EMAIL;
	const to = env.GUESTBOOK_NOTIFY_TO || env.CONTACT_TO_EMAIL;
	if (!env.RESEND_KEY || !from || !to) return;

	const site = comment.site ? ` (${escapeHtml(comment.site)})` : "";
	const html = `<p><strong>${escapeHtml(comment.name)}</strong>${site} left a guestbook message:</p><blockquote>${escapeHtml(comment.message)}</blockquote>`;
	const text = `${comment.name}${comment.site ? ` (${comment.site})` : ""} left a guestbook message:\n\n${comment.message}`;

	try {
		const resend = new Resend(env.RESEND_KEY);
		const { error } = await resend.emails.send({
			from,
			to,
			subject: `New guestbook message from ${comment.name}`,
			html,
			text,
		});
		if (error) console.error("Guestbook notify failed:", error);
	} catch (error) {
		console.error("Guestbook notify threw:", error);
	}
}

async function insertComment(
	env: GuestbookEnv,
	row: Omit<CommentRow, "id" | "updatedAt">,
): Promise<number> {
	const { meta } = await env.DB.prepare(
		"INSERT INTO comments (name, site, message, created_at, author_type, author_id, avatar_url, owner_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
	)
		.bind(
			row.name,
			row.site,
			row.message,
			row.createdAt,
			row.author_type,
			row.author_id,
			row.avatar_url,
			row.owner_hash,
		)
		.run();
	return meta.last_row_id;
}

export async function onRequestGet(context: FunctionContext): Promise<Response> {
	const { request, env } = context;
	const url = new URL(request.url);
	const { offset, limit } = guestbookQuerySchema.parse({
		offset: url.searchParams.get("offset"),
		limit: url.searchParams.get("limit"),
	});

	const token = readOwnerToken(request);
	const sessionUser = await getSessionUser(request, env);
	const viewer = {
		ownerHash: token ? await hashOwnerToken(token) : null,
		sub: sessionUser?.id ?? null,
	};

	const { results } = await env.DB.prepare(
		`SELECT ${COMMENT_COLUMNS} FROM comments ORDER BY id DESC LIMIT ? OFFSET ?`,
	)
		.bind(limit + 1, offset)
		.all<CommentRow>();

	const hasMore = results.length > limit;
	const rows = hasMore ? results.slice(0, limit) : results;
	const items = rows.map((row) => toComment(row, viewer));

	return json({ items, nextOffset: hasMore ? offset + limit : null }, 200);
}

export async function onRequestPost(context: FunctionContext): Promise<Response> {
	const { request, env } = context;

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: "invalid_json" }, 400);
	}

	const sessionUser = await getSessionUser(request, env);
	const createdAt = Date.now();

	if (sessionUser) {
		const parsed = verifiedSchema.safeParse(body);
		if (!parsed.success) return json({ error: "invalid_input" }, 400);

		const provider = await getUserProvider(env, sessionUser.id);
		const site = normalizeSite(parsed.data.site);
		const id = await insertComment(env, {
			name: sessionUser.name,
			site,
			message: parsed.data.message,
			createdAt,
			author_type: provider,
			author_id: sessionUser.id,
			avatar_url: sessionUser.image,
			owner_hash: null,
		});

		const item: GuestbookCommentDTO = {
			id,
			name: sessionUser.name,
			site,
			message: parsed.data.message,
			createdAt,
			updatedAt: null,
			authorType: provider,
			avatar: sessionUser.image,
			isOwn: true,
		};
		await notify(env, item);
		context.waitUntil(triggerRebuild(env));
		return json({ item }, 201);
	}

	const parsed = inputSchema.safeParse(body);
	if (!parsed.success) return json({ error: "invalid_input" }, 400);

	const human = await verifyTurnstile(
		env.CF_TURNSTILE_SECRET_KEY,
		parsed.data.token,
		request.headers.get("cf-connecting-ip"),
	);
	if (!human) return json({ error: "turnstile_failed" }, 403);

	const site = normalizeSite(parsed.data.site);
	const existingToken = readOwnerToken(request);
	const ownerToken = existingToken ?? mintOwnerToken();
	const ownerHash = await hashOwnerToken(ownerToken);

	const id = await insertComment(env, {
		name: parsed.data.name,
		site,
		message: parsed.data.message,
		createdAt,
		author_type: "anon",
		author_id: null,
		avatar_url: null,
		owner_hash: ownerHash,
	});

	const item: GuestbookCommentDTO = {
		id,
		name: parsed.data.name,
		site,
		message: parsed.data.message,
		createdAt,
		updatedAt: null,
		authorType: "anon",
		avatar: null,
		isOwn: true,
	};
	await notify(env, item);
	context.waitUntil(triggerRebuild(env));

	const headers = existingToken ? undefined : { "set-cookie": ownerSetCookie(ownerToken) };
	return json({ item }, 201, headers);
}
