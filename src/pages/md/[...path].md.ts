import { getEntry } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";

import { NOW_UPDATED_AT } from "@/data/now";
import { LOCALES, type Locale, localizePath } from "@/i18n";
import { toMarkdownPath } from "@/lib/agent/markdown-path";
import {
	buildArchiveMarkdown,
	buildFeedbackMarkdown,
	buildGuestbookMarkdown,
	buildHomeMarkdown,
	buildInspirationMarkdown,
	buildLegalMarkdown,
	buildNoteMarkdown,
	buildNotesMarkdown,
	buildNowMarkdown,
} from "@/lib/agent/pages";
import { formatDate, parsePublishedAt } from "@/lib/datetime";
import { getGuestbookAtBuild } from "@/lib/guestbook/build";
import { getNotes } from "@/lib/notes";

type Build = () => string | Promise<string>;

interface MarkdownPath {
	params: { path: string };
	props: { build: Build };
}

function toParam(page: string, locale: Locale) {
	return toMarkdownPath(localizePath(`/${page}`, locale)).replace(
		/^\/md\/|\.md$/g,
		"",
	);
}

async function localePaths(locale: Locale): Promise<Array<MarkdownPath>> {
	const notes = await getNotes(locale);
	const guestbook = await getGuestbookAtBuild();
	const updated = formatDate(
		undefined,
		locale,
	)(parsePublishedAt(NOW_UPDATED_AT));

	const legal =
		(slug: "privacy" | "accessibility"): Build =>
		async () => {
			const entry = await getEntry("legal", `${locale}/${slug}`);
			if (!entry) throw new Error(`Missing legal page ${slug} for ${locale}`);
			return buildLegalMarkdown(locale, `/${slug}`, entry);
		};

	const pages: Record<string, Build> = {
		"": () => buildHomeMarkdown(locale, notes),
		notes: () => buildNotesMarkdown(locale, notes),
		now: () => buildNowMarkdown(locale, notes, updated),
		archive: () => buildArchiveMarkdown(locale),
		guestbook: () => buildGuestbookMarkdown(locale, guestbook),
		feedback: () => buildFeedbackMarkdown(locale),
		inspiration: () => buildInspirationMarkdown(locale),
		privacy: legal("privacy"),
		accessibility: legal("accessibility"),
	};
	for (const note of notes) {
		pages[`notes/${note.slug}`] = () => buildNoteMarkdown(locale, note);
	}

	return Object.entries(pages).map((entry) => ({
		params: { path: toParam(entry[0], locale) },
		props: { build: entry[1] },
	}));
}

export const getStaticPaths = (async () => {
	const paths = await Promise.all(LOCALES.map(localePaths));
	return paths.flat();
}) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
	const build = (context.props as MarkdownPath["props"]).build;
	return new Response(await build(), {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
};
