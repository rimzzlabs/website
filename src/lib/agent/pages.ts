import type { ImageMetadata } from "astro";

import { getArchive } from "@/data/archive";
import { HERO_LINKS } from "@/data/home";
import { getNowItems, NOW_INTRO_LINKS } from "@/data/now";
import { PROJECTS } from "@/data/projects";
import { fill, getDictionary, HTML_LANG, type Locale } from "@/i18n";
import { htmlToMarkdown, richText } from "@/lib/agent/convert";
import { imageMarkdown } from "@/lib/agent/images";
import { noteBodyMarkdown } from "@/lib/agent/note-body";
import { SITE, siteUrl, withAbsoluteLinks } from "@/lib/agent/site";
import type { GuestbookPage } from "@/lib/guestbook/schema";
import type { Note } from "@/lib/notes";

function header(
	title: string,
	description: string,
	canonical: string,
	locale: Locale,
) {
	return [
		`# ${htmlToMarkdown(title)}`,
		"",
		`> ${htmlToMarkdown(description)}`,
		"",
		`- Canonical: ${canonical}`,
		`- Language: ${HTML_LANG[locale]}`,
		"",
	];
}

function noteLine(note: Note) {
	return `- [${note.data.title}](${SITE}${note.url}/) (${note.dateISO.slice(0, 10)}): ${note.data.description}`;
}

export function buildHomeMarkdown(locale: Locale, notes: ReadonlyArray<Note>) {
	const t = getDictionary(locale);
	return [
		...header(
			t.home.seoTitle,
			t.home.seoDescription,
			siteUrl("/", locale),
			locale,
		),
		richText(t.home.heroWork, HERO_LINKS.work),
		"",
		richText(t.home.heroPast, HERO_LINKS.past),
		"",
		`## ${t.home.projectsTitle}`,
		"",
		t.home.projectsDescription,
		"",
		...PROJECTS.map((project) => {
			const copy = t.home.projects[project.key];
			return `- [${project.name}](${project.href}) (${htmlToMarkdown(copy.role)}): ${htmlToMarkdown(copy.description)}`;
		}),
		"",
		`## ${t.home.notesTitle}`,
		"",
		t.home.notesDescription,
		"",
		...notes.slice(0, 5).map(noteLine),
		"",
		`${fill(t.home.notesMore, { count: notes.length })}: ${siteUrl("/notes", locale)}`,
		"",
		`## ${t.home.contactTitle}`,
		"",
		htmlToMarkdown(t.home.contactBody),
		"",
		"- Schedule a call: https://cal.com/rimzzlabs",
		`- Feedback on this site: ${siteUrl("/feedback", locale)}`,
		"",
		"## For agents",
		"",
		"- Every page is available as markdown. Send `Accept: text/markdown`.",
		`- Notes feed: ${siteUrl("/notes/rss.xml", locale)}`,
		`- OpenAPI description: ${SITE}/openapi.json`,
		`- API catalog: ${SITE}/.well-known/api-catalog`,
		`- Agent skills: ${SITE}/.well-known/agent-skills/index.json`,
		"",
	].join("\n");
}

export function buildNotesMarkdown(locale: Locale, notes: ReadonlyArray<Note>) {
	const t = getDictionary(locale);
	return [
		...header(
			t.notes.title,
			t.notes.seoDescription,
			siteUrl("/notes", locale),
			locale,
		),
		...notes.map(noteLine),
		"",
		`RSS: ${siteUrl("/notes/rss.xml", locale)}`,
		"",
	].join("\n");
}

export async function buildNoteMarkdown(locale: Locale, note: Note) {
	const t = getDictionary(locale);
	return [
		...header(
			note.data.title,
			note.data.description,
			`${SITE}${note.url}/`,
			locale,
		),
		`- ${t.og.note}: ${note.dateISO.slice(0, 10)}`,
		`- Author: Rizki Citra (${SITE})`,
		"",
		"---",
		"",
		await noteBodyMarkdown(note.body ?? ""),
		"",
	].join("\n");
}

export function buildNowMarkdown(
	locale: Locale,
	notes: ReadonlyArray<Note>,
	updated: string,
) {
	const t = getDictionary(locale);
	const latest = notes[0];
	return [
		...header(
			t.now.title,
			t.now.seoDescription,
			siteUrl("/now", locale),
			locale,
		),
		richText(t.now.intro, NOW_INTRO_LINKS),
		"",
		`${t.now.lastUpdated}: ${updated}`,
		"",
		...getNowItems(t).flatMap((item) => [
			`## ${item.label}: ${htmlToMarkdown(item.title)}`,
			"",
			htmlToMarkdown(item.description),
			"",
			...item.links.map((link) => `- [${link.label}](${link.href})`),
			"",
		]),
		`## ${t.now.writing.label}: ${htmlToMarkdown(t.now.writing.title)}`,
		"",
		richText(fill(t.now.writing.body, { count: notes.length }), {
			note: {
				href: `${SITE}${latest?.url ?? ""}/`,
				label: latest?.data.title ?? "",
			},
		}),
		"",
		`## ${t.now.openTo.label}: ${htmlToMarkdown(t.now.openTo.title)}`,
		"",
		richText(t.now.openTo.body, {
			sayHello: {
				href: `${siteUrl("/", locale)}#contact`,
				label: t.now.openTo.sayHello,
			},
		}),
		"",
	].join("\n");
}

export async function buildArchiveMarkdown(locale: Locale) {
	const t = getDictionary(locale);
	const years = await Promise.all(
		getArchive(locale).map(async (year) => {
			const sections = await Promise.all(
				(year.sections ?? []).map(async (section) => [
					`### ${htmlToMarkdown(section.heading)}`,
					"",
					...section.paragraphs.flatMap((paragraph) => [
						htmlToMarkdown(paragraph),
						"",
					]),
					...(await photoLines(section.photos ?? [])),
				]),
			);
			return [
				`## ${year.year}: ${htmlToMarkdown(year.title)}`,
				"",
				...year.paragraphs.flatMap((paragraph) => [
					htmlToMarkdown(paragraph),
					"",
				]),
				...(await photoLines(year.photos)),
				...sections.flat(),
			];
		}),
	);
	return [
		...header(
			t.archive.title,
			t.archive.seoDescription,
			siteUrl("/archive", locale),
			locale,
		),
		htmlToMarkdown(t.archive.intro),
		"",
		...years.flat(),
	].join("\n");
}

async function photoLines(
	photos: ReadonlyArray<{ src: ImageMetadata; alt: string }>,
) {
	const lines = await Promise.all(
		photos.map((photo) => imageMarkdown(photo.alt, photo.src)),
	);
	if (lines.length === 0) return [];
	return [...lines, ""];
}

export function buildGuestbookMarkdown(locale: Locale, page: GuestbookPage) {
	const t = getDictionary(locale);
	return [
		...header(
			t.guestbook.title,
			t.guestbook.seoDescription,
			siteUrl("/guestbook", locale),
			locale,
		),
		"To read or sign the guestbook through the API, see the agent skill:",
		`${SITE}/.well-known/agent-skills/guestbook/SKILL.md`,
		"",
		`## ${t.guestbook.entries}`,
		"",
		...page.items.map((entry) => {
			const name = entry.name || t.guestbook.anonymous;
			const date = new Date(entry.createdAt).toISOString().slice(0, 10);
			return `- **${name}** (${date}): ${entry.message.replace(/\s+/g, " ")}`;
		}),
		"",
	].join("\n");
}

export function buildFeedbackMarkdown(locale: Locale) {
	const t = getDictionary(locale);
	return [
		...header(
			t.feedback.title,
			t.feedback.seoDescription,
			siteUrl("/feedback", locale),
			locale,
		),
		t.feedback.intro,
		"",
		"The form needs a browser, because it uses Cloudflare Turnstile.",
		`API description: ${SITE}/openapi.json (POST /api/feedback)`,
		"",
	].join("\n");
}

export function buildLegalMarkdown(
	locale: Locale,
	path: string,
	entry: {
		data: { title: string; description: string; updatedAt: string };
		body?: string;
	},
) {
	return [
		...header(
			entry.data.title,
			entry.data.description,
			siteUrl(path, locale),
			locale,
		),
		`- Last updated: ${entry.data.updatedAt}`,
		"",
		withAbsoluteLinks(entry.body ?? ""),
		"",
	].join("\n");
}
