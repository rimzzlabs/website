import { guestbookEditSchema, guestbookVerifiedSchema } from "../../../src/lib/guestbook-schema";
import { getSessionUser } from "../../_lib/auth";
import {
	COMMENT_COLUMNS,
	type CommentRow,
	type GuestbookEnv,
	hashOwnerToken,
	json,
	normalizeSite,
	ownsComment,
	readOwnerToken,
	toComment,
	type Viewer,
} from "../../_lib/guestbook";

interface ItemContext {
	request: Request;
	env: GuestbookEnv;
	params: { id: string };
}

const editSchema = guestbookEditSchema({ name: "invalid", message: "invalid" });
const verifiedSchema = guestbookVerifiedSchema({ message: "invalid" });

function parseId(params: { id: string }): number | null {
	const id = Number.parseInt(params.id, 10);
	return Number.isInteger(id) && id > 0 ? id : null;
}

async function authorize(
	request: Request,
	env: GuestbookEnv,
	id: number,
): Promise<{ row: CommentRow; viewer: Viewer } | Response> {
	const token = readOwnerToken(request);
	const sessionUser = await getSessionUser(request, env);
	const viewer: Viewer = {
		ownerHash: token ? await hashOwnerToken(token) : null,
		sub: sessionUser?.id ?? null,
	};

	const row = await env.DB.prepare(`SELECT ${COMMENT_COLUMNS} FROM comments WHERE id = ?`)
		.bind(id)
		.first<CommentRow>();

	if (!row) return json({ error: "not_found" }, 404);
	if (!ownsComment(row, viewer)) return json({ error: "forbidden" }, 403);
	return { row, viewer };
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

	const auth = await authorize(context.request, context.env, id);
	if (auth instanceof Response) return auth;

	// Verified authors keep the provider's name; anonymous authors may change it.
	let name = auth.row.name;
	let site: string | null;
	let message: string;
	if (auth.row.author_type === "anon") {
		const parsed = editSchema.safeParse(body);
		if (!parsed.success) return json({ error: "invalid_input" }, 400);
		name = parsed.data.name;
		site = normalizeSite(parsed.data.site);
		message = parsed.data.message;
	} else {
		const parsed = verifiedSchema.safeParse(body);
		if (!parsed.success) return json({ error: "invalid_input" }, 400);
		site = normalizeSite(parsed.data.site);
		message = parsed.data.message;
	}

	const updatedAt = Date.now();
	await context.env.DB.prepare(
		"UPDATE comments SET name = ?, site = ?, message = ?, updated_at = ? WHERE id = ?",
	)
		.bind(name, site, message, updatedAt, id)
		.run();

	const item = toComment({ ...auth.row, name, site, message, updatedAt }, auth.viewer);
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
