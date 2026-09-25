import { AR, O, pipe, R } from "@mobily/ts-belt";

import {
	GUESTBOOK_SELECT,
	type GuestbookEntry,
	guestbookAnonymousSchema,
	guestbookQuerySchema,
	guestbookVerifiedSchema,
	normalizeSite,
	toGuestbookPage,
} from "../../src/lib/guestbook/schema";
import { getSessionUser, type SessionUser } from "../_lib/auth";
import {
	type GuestbookEnv,
	type PagesContext,
	triggerRebuild,
} from "../_lib/guestbook";
import { verifyTurnstile } from "../_lib/turnstile";

interface NewComment {
	name: string;
	site: string | null;
	message: string;
	authorType: GuestbookEntry["authorType"];
	authorId: string | null;
	avatar: string | null;
	spam: boolean;
}

function toVerifiedComment(user: SessionUser, body: unknown) {
	return pipe(
		R.fromExecution(() => guestbookVerifiedSchema.parse(body)),
		R.map(
			(input): NewComment => ({
				name: user.name,
				site: normalizeSite(input.site),
				message: input.message,
				authorType: "github",
				authorId: user.id,
				avatar: user.image,
				spam: false,
			}),
		),
	);
}

function toAnonymousComment(body: unknown) {
	return pipe(
		R.fromExecution(() => guestbookAnonymousSchema.parse(body)),
		R.map(
			(input): NewComment => ({
				name: input.name ?? "",
				site: normalizeSite(input.site),
				message: input.message,
				authorType: "anon",
				authorId: null,
				avatar: null,
				spam: Boolean(input.company),
			}),
		),
	);
}

function insertComment(env: GuestbookEnv, comment: NewComment) {
	return env.DB.prepare(
		"INSERT INTO comments (name, site, message, created_at, author_type, author_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
	)
		.bind(
			comment.name,
			comment.site,
			comment.message,
			Date.now(),
			comment.authorType,
			comment.authorId,
			comment.avatar,
		)
		.run();
}

function saveComment(context: PagesContext, comment: NewComment) {
	if (comment.spam) {
		return Promise.resolve(Response.json({ ok: true }, { status: 201 }));
	}

	return pipe(
		AR.make(insertComment(context.env, comment)),
		AR.tap(() => context.waitUntil(triggerRebuild(context.env))),
		AR.match(
			() => Response.json({ ok: true }, { status: 201 }),
			() => Response.json({ error: "Could not save entry." }, { status: 500 }),
		),
	);
}

export async function onRequestGet(context: PagesContext) {
	const url = new URL(context.request.url);
	const query = guestbookQuerySchema.parse({
		cursor: url.searchParams.get("cursor"),
		limit: url.searchParams.get("limit"),
	});

	const rows = await context.env.DB.prepare(GUESTBOOK_SELECT)
		.bind(query.cursor, query.limit + 1)
		.all<GuestbookEntry>();

	return Response.json(toGuestbookPage(rows.results, query.limit));
}

export async function onRequestPost(context: PagesContext) {
	const body = await context.request.json().catch(() => null);
	const user = await getSessionUser(context.request, context.env);

	if (!user) {
		const human = await verifyTurnstile(
			context.env.CF_TURNSTILE_SECRET_KEY,
			context.request,
			body,
		);
		if (!human) {
			return Response.json(
				{ error: "Could not verify the request." },
				{ status: 403 },
			);
		}
	}

	return pipe(
		O.fromNullable(user),
		O.match(
			(sessionUser) => toVerifiedComment(sessionUser, body),
			() => toAnonymousComment(body),
		),
		R.match(
			(value) => saveComment(context, value),
			() =>
				Promise.resolve(
					Response.json({ error: "Invalid entry." }, { status: 400 }),
				),
		),
	);
}
