import { O, pipe } from "@mobily/ts-belt";

import { type ActivityDetail, ActivityEmail } from "../../src/emails/activity";
import type { GuestbookEntry } from "../../src/lib/guestbook/schema";
import { type NotifyEnv, sendNotification } from "./notify";

interface GuestbookActivity {
	origin: string;
	name: string;
	site: string | null;
	message: string;
	authorType: GuestbookEntry["authorType"];
}

interface HeartActivity {
	origin: string;
	slug: string;
	visitor: string;
	count: number;
}

interface AssetsEnv extends NotifyEnv {
	ASSETS: { fetch: (input: string) => Promise<Response> };
}

const HEART_LOCK_SECONDS = 60 * 60 * 24;
const PREVIEW_LENGTH = 90;

const AUTHOR_TYPES: Record<GuestbookEntry["authorType"], string> = {
	github: "GitHub",
	google: "Google",
	anon: "Anonymous",
};

export function notifyGuestbookEntry(
	env: NotifyEnv,
	activity: GuestbookActivity,
) {
	const name = activity.name || "Someone";
	const website = pipe(
		O.fromNullable(activity.site),
		O.match(
			(site): ReadonlyArray<ActivityDetail> => [
				{ label: "Website", value: site, href: site },
			],
			() => [],
		),
	);
	const details: ReadonlyArray<ActivityDetail> = [
		{ label: "Name", value: name },
		{ label: "Signed with", value: AUTHOR_TYPES[activity.authorType] },
		...website,
	];

	return sendNotification(env, {
		subject: `${name} signed the guestbook`,
		react: (
			<ActivityEmail
				source="guestbook"
				title={`${name} signed the guestbook`}
				summary={activity.message.slice(0, PREVIEW_LENGTH)}
				quote={activity.message}
				details={details}
				action={{
					label: "Open the guestbook",
					href: new URL("/guestbook/", activity.origin).toString(),
				}}
			/>
		),
	});
}

function formatHearts(count: number) {
	if (count === 1) return "1 heart";
	return `${count} hearts`;
}

async function claimHeartLock(activity: HeartActivity) {
	const cache = (caches as unknown as { default: Cache }).default;
	const key = `https://notify.internal/heart/${activity.slug}/${activity.visitor}`;
	if (await cache.match(key)) return false;

	await cache.put(
		key,
		new Response(null, {
			headers: { "cache-control": `max-age=${HEART_LOCK_SECONDS}` },
		}),
	);
	return true;
}

async function fetchNoteMarkdown(env: AssetsEnv, activity: HeartActivity) {
	const url = new URL(`/md/notes/${activity.slug}.md`, activity.origin);
	const asset = await env.ASSETS.fetch(url.toString()).catch(() => null);
	if (asset?.ok) return asset;
	return fetch(url).catch(() => null);
}

async function readNoteTitle(env: AssetsEnv, activity: HeartActivity) {
	const response = await fetchNoteMarkdown(env, activity);
	if (!response?.ok) return activity.slug;

	const text = await response.text();
	return text.match(/^# (.+)$/m)?.[1] ?? activity.slug;
}

export async function notifyNoteHeart(env: AssetsEnv, activity: HeartActivity) {
	const claimed = await claimHeartLock(activity);
	if (!claimed) return false;

	const title = await readNoteTitle(env, activity);
	const href = new URL(`/notes/${activity.slug}/`, activity.origin).toString();
	const hearts = formatHearts(activity.count);

	return sendNotification(env, {
		subject: `Someone liked "${title}"`,
		react: (
			<ActivityEmail
				source="note reactions"
				title="Someone liked your note"
				summary={`"${title}" now has ${hearts}.`}
				details={[
					{ label: "Note", value: title, href },
					{ label: "Total", value: hearts },
				]}
				action={{ label: "Open the note", href }}
			/>
		),
	});
}
