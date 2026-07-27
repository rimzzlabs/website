import { guestbookEditSchema } from "../../../src/lib/guestbook-schema";
import {
	COMMENT_COLUMNS,
	type CommentRow,
	type GuestbookEnv,
	hashOwnerToken,
	json,
	normalizeSite,
	readOwnerToken,
	toComment,
} from "../../_lib/guestbook";

interface ItemContext {
	request: Request;
	env: GuestbookEnv;
	params: { id: string };
}

const SERVER_MESSAGES = { name: "invalid", message: "invalid" };
const editSchema = guestbookEditSchema(SERVER_MESSAGES);

function parseId(params: { id: string }): number | null {
	const id = Number.parseInt(params.id, 10);
	return Number.isInteger(id) && id > 0 ? id : null;
}

async function authorize(
	request: Request,
	env: GuestbookEnv,
	id: number,
): Promise<{ row: CommentRow; viewerHash: string } | Response> {
	const token = readOwnerToken(request);
	if (!token) return json({ error: "forbidden" }, 403);

	const viewerHash = await hashOwnerToken(token);
	const row = await env.DB.prepare(`SELECT ${COMMENT_COLUMNS} FROM comments WHERE id = ?`)
		.bind(id)
		.first<CommentRow>();

	if (!row) return json({ error: "not_found" }, 404);
	if (row.owner_hash == null || row.owner_hash !== viewerHash) {
		return json({ error: "forbidden" }, 403);
	}
	return { row, viewerHash };
}

export async function onRequestPatch(context: ItemContext): Promise<Response> {
	const id = parseId(context.params);
	if (id == null) return json({ error: "invalid_id" }, 400);

	let body: unknown;
	try {
		body = await context.request.json();
	} catch {
		return json({ error: "invalid_json" }, 400);
	}

	const parsed = editSchema.safeParse(body);
	if (!parsed.success) return json({ error: "invalid_input" }, 400);

	const auth = await authorize(context.request, context.env, id);
	if (auth instanceof Response) return auth;

	const { name, message } = parsed.data;
	const site = normalizeSite(parsed.data.site);
	const updatedAt = Date.now();

	await context.env.DB.prepare(
		"UPDATE comments SET name = ?, site = ?, message = ?, updated_at = ? WHERE id = ?",
	)
		.bind(name, site, message, updatedAt, id)
		.run();

	const item = toComment({ ...auth.row, name, site, message, updatedAt }, auth.viewerHash);
	return json({ item }, 200);
}

export async function onRequestDelete(context: ItemContext): Promise<Response> {
	const id = parseId(context.params);
	if (id == null) return json({ error: "invalid_id" }, 400);

	const auth = await authorize(context.request, context.env, id);
	if (auth instanceof Response) return auth;

	await context.env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
	return json({ ok: true }, 200);
}
