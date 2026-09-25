import { AR, pipe, R } from "@mobily/ts-belt";
import { en } from "../../../src/i18n/en";
import { createGuestbookEditSchema } from "../../../src/lib/guestbook/schema";
import { getSessionUser } from "../../_lib/auth";
import {
	type GuestbookEnv,
	type PagesContext,
	triggerRebuild,
} from "../../_lib/guestbook";

interface EntryContext extends PagesContext {
	params: { id: string };
}

interface EntryFailure {
	status: number;
	message: string;
}

interface EntryRow {
	author_type: string;
	author_id: string | null;
}

const INVALID_ID: EntryFailure = { status: 400, message: "Invalid entry id." };
const INVALID_ENTRY: EntryFailure = { status: 400, message: "Invalid entry." };
const SIGNED_OUT: EntryFailure = { status: 401, message: "Sign in first." };
const NOT_FOUND: EntryFailure = { status: 404, message: "Entry not found." };
const NOT_OWNER: EntryFailure = {
	status: 403,
	message: "You can only change your own entry.",
};
const SAVE_FAILED: EntryFailure = {
	status: 500,
	message: "Could not save the change.",
};

const editSchema = createGuestbookEditSchema(en.guestbook.validation);

function parseId(raw: string) {
	const id = Number(raw);
	if (!Number.isInteger(id) || id <= 0) return null;
	return id;
}

function fail(failure: EntryFailure) {
	return Response.json({ error: failure.message }, { status: failure.status });
}

// Only entries signed with GitHub have an owner. Anonymous entries stay as
// they are, because there is no account to prove who wrote them.
async function authorize(
	context: EntryContext,
	id: number,
): AR.AsyncResult<number, EntryFailure> {
	const user = await getSessionUser(context.request, context.env);
	if (!user) return R.Error(SIGNED_OUT);

	const row = await context.env.DB.prepare(
		"SELECT author_type, author_id FROM comments WHERE id = ?",
	)
		.bind(id)
		.first<EntryRow>();
	if (!row) return R.Error(NOT_FOUND);
	if (row.author_type !== "github" || row.author_id !== user.id) {
		return R.Error(NOT_OWNER);
	}
	return R.Ok(id);
}

function run(env: GuestbookEnv, query: string, values: Array<unknown>) {
	return pipe(
		AR.make(
			env.DB.prepare(query)
				.bind(...values)
				.run(),
		),
		AR.mapError(() => SAVE_FAILED),
	);
}

function respond(context: EntryContext) {
	return AR.match(() => {
		context.waitUntil(triggerRebuild(context.env));
		return Response.json({ ok: true });
	}, fail);
}

export async function onRequestPatch(context: EntryContext) {
	const id = parseId(context.params.id);
	if (id === null) return fail(INVALID_ID);

	const input = editSchema.safeParse(
		await context.request.json().catch(() => null),
	);
	if (!input.success) return fail(INVALID_ENTRY);

	return pipe(
		authorize(context, id),
		AR.flatMap(() =>
			run(
				context.env,
				"UPDATE comments SET message = ?, updated_at = ? WHERE id = ?",
				[input.data.message, Date.now(), id],
			),
		),
		respond(context),
	);
}

export async function onRequestDelete(context: EntryContext) {
	const id = parseId(context.params.id);
	if (id === null) return fail(INVALID_ID);

	return pipe(
		authorize(context, id),
		AR.flatMap(() =>
			run(context.env, "DELETE FROM comments WHERE id = ?", [id]),
		),
		respond(context),
	);
}
