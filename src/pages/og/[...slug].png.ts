import { getEntry } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";

import { getArchive } from "@/data/archive";
import { NOW_UPDATED_AT } from "@/data/now";
import { getDictionary, LOCALES, type Locale } from "@/i18n";
import { fill } from "@/i18n/fill";
import { formatDate, parsePublishedAt } from "@/lib/datetime";
import { getGuestbookAtBuild } from "@/lib/guestbook/build";
import { getNotes } from "@/lib/notes";
import type { OgCard } from "@/lib/og/cards";
import { fetchAvatar, renderOgImage } from "@/lib/og/render";

interface OgPath {
	params: { slug: string };
	props: { card: OgCard };
}

const WORDS_PER_MINUTE = 200;
const LIST_SIZE = 3;
const SIGNER_COUNT = 5;
const MONTH_YEAR: Intl.DateTimeFormatOptions = {
	month: "short",
	year: "numeric",
};

function stripTags(text: string) {
	return text.replace(/<[^>]+>/g, "");
}

function lowerFirst(text: string) {
	return text.charAt(0).toLowerCase() + text.slice(1);
}

function readMinutes(body: string | undefined) {
	const words = (body ?? "").split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function loadAvatar(url: string | null) {
	if (!url) return Promise.resolve(null);
	return fetchAvatar(url);
}

function signedTemplate(t: ReturnType<typeof getDictionary>, more: boolean) {
	if (more) return t.og.guestbookSignedMore;
	return t.og.guestbookSigned;
}

async function getSigners() {
	const page = await getGuestbookAtBuild();
	const signers = await Promise.all(
		page.items.slice(0, SIGNER_COUNT).map(async (entry) => ({
			name: entry.name || "?",
			avatar: await loadAvatar(entry.avatar),
		})),
	);
	return { signers, count: page.items.length, more: page.nextCursor !== null };
}

async function legalCard(locale: Locale, slug: "privacy" | "accessibility") {
	const t = getDictionary(locale);
	const entry = await getEntry("legal", `${locale}/${slug}`);
	if (!entry) throw new Error(`Missing legal page ${slug} for ${locale}`);

	const updated = fill(t.og.updated, {
		date: formatDate(undefined, locale)(parsePublishedAt(entry.data.updatedAt)),
	});
	const META: Record<typeof slug, string> = {
		privacy: updated,
		accessibility: "WCAG 2.2 AA",
	};
	return {
		kind: "page",
		label: t.footer[slug],
		meta: META[slug],
		title: entry.data.title,
		description: entry.data.description,
		watermark: "",
	} satisfies OgCard;
}

async function localePaths(
	locale: Locale,
	guestbook: Awaited<ReturnType<typeof getSigners>>,
): Promise<Array<OgPath>> {
	const t = getDictionary(locale);
	const notes = await getNotes(locale);
	const years = getArchive(locale).map((entry) => entry.year);
	const firstYear = Math.min(...years);
	const lastYear = Math.max(...years);

	const cards: Record<string, OgCard> = {
		home: {
			kind: "home",
			tagline: t.og.homeTagline,
			status: fill(t.og.homeStatus, {
				work: lowerFirst(stripTags(t.now.work.title)),
			}),
		},
		notes: {
			kind: "list",
			label: t.nav.notes,
			meta: fill(t.og.notesCount, { count: notes.length }),
			title: t.og.notesTitle,
			items: notes.slice(0, LIST_SIZE).map((note) => ({
				meta: formatDate(MONTH_YEAR, locale)(new Date(note.dateISO)),
				text: note.data.title,
			})),
			bullets: false,
			highlight: false,
		},
		guestbook: {
			kind: "guestbook",
			label: t.nav.guestbook,
			title: t.og.guestbookTitle,
			signers: guestbook.signers,
			signed: fill(signedTemplate(t, guestbook.more), {
				count: guestbook.count,
			}),
		},
		now: {
			kind: "list",
			label: t.footer.now,
			meta: fill(t.og.updated, {
				date: formatDate(undefined, locale)(parsePublishedAt(NOW_UPDATED_AT)),
			}),
			title: t.og.nowTitle,
			items: [t.now.work, t.now.building, t.now.site].map((item) => ({
				meta: "",
				text: stripTags(item.title),
			})),
			bullets: true,
			highlight: true,
		},
		archive: {
			kind: "page",
			label: t.footer.archive,
			meta: `${firstYear}–${lastYear}`,
			title: fill(t.og.archiveTitle, { count: lastYear - firstYear }),
			description: t.og.archiveDescription,
			watermark: String(firstYear),
		},
		privacy: await legalCard(locale, "privacy"),
		accessibility: await legalCard(locale, "accessibility"),
		feedback: {
			kind: "page",
			label: t.footer.feedback,
			meta: "",
			title: t.feedback.title,
			description: t.feedback.intro,
			watermark: "",
		},
	};

	for (const note of notes) {
		cards[`notes/${note.slug}`] = {
			kind: "note",
			label: t.og.note,
			date: formatDate(undefined, locale)(new Date(note.dateISO)),
			title: note.data.title,
			description: note.data.description,
			readTime: fill(t.og.readTime, { count: readMinutes(note.body) }),
		};
	}

	return Object.entries(cards).map((entry) => ({
		params: { slug: `${locale}/${entry[0]}` },
		props: { card: entry[1] },
	}));
}

export const getStaticPaths = (async () => {
	const guestbook = await getSigners();
	const paths = await Promise.all(
		LOCALES.map((locale) => localePaths(locale, guestbook)),
	);
	return paths.flat();
}) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
	const card = (context.props as OgPath["props"]).card;
	const png = await renderOgImage(card);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
