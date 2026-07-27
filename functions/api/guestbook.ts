import { Resend } from "resend";
import { guestbookInputSchema, guestbookQuerySchema } from "../../src/lib/guestbook-schema";
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
} from "../_lib/guestbook";
import { verifyTurnstile } from "../_lib/turnstile";

interface FunctionContext {
	request: Request;
	env: GuestbookEnv;
}

const SERVER_MESSAGES = { name: "invalid", message: "invalid", token: "invalid" };
const inputSchema = guestbookInputSchema(SERVER_MESSAGES);

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

export async function onRequestGet(context: FunctionContext): Promise<Response> {
	const { request, env } = context;
	const url = new URL(request.url);
	const { offset, limit } = guestbookQuerySchema.parse({
		offset: url.searchParams.get("offset"),
		limit: url.searchParams.get("limit"),
	});

	const token = readOwnerToken(request);
	const viewerHash = token ? await hashOwnerToken(token) : null;

	const { results } = await env.DB.prepare(
		`SELECT ${COMMENT_COLUMNS} FROM comments ORDER BY id DESC LIMIT ? OFFSET ?`,
	)
		.bind(limit + 1, offset)
		.all<CommentRow>();

	const hasMore = results.length > limit;
	const rows = hasMore ? results.slice(0, limit) : results;
	const items = rows.map((row) => toComment(row, viewerHash));

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

	const parsed = inputSchema.safeParse(body);
	if (!parsed.success) return json({ error: "invalid_input" }, 400);

	const { name, message, token } = parsed.data;
	const site = normalizeSite(parsed.data.site);

	const human = await verifyTurnstile(
		env.CF_TURNSTILE_SECRET_KEY,
		token,
		request.headers.get("cf-connecting-ip"),
	);
	if (!human) return json({ error: "turnstile_failed" }, 403);

	const existingToken = readOwnerToken(request);
	const ownerToken = existingToken ?? mintOwnerToken();
	const ownerHash = await hashOwnerToken(ownerToken);

	const createdAt = Date.now();
	const { meta } = await env.DB.prepare(
		"INSERT INTO comments (name, site, message, created_at, owner_hash) VALUES (?, ?, ?, ?, ?)",
	)
		.bind(name, site, message, createdAt, ownerHash)
		.run();

	const item: GuestbookCommentDTO = {
		id: meta.last_row_id,
		name,
		site,
		message,
		createdAt,
		updatedAt: null,
		isOwn: true,
	};
	await notify(env, item);

	const headers = existingToken ? undefined : { "set-cookie": ownerSetCookie(ownerToken) };
	return json({ item }, 201, headers);
}
