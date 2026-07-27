import { EXPERIENCE_COMPANIES } from "@/components/home/experience-companies";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { LocalizedNote } from "@/lib/notes";

// Builders for the markdown variants under /md/*, served to agents via
// `Accept: text/markdown` content negotiation in functions/_middleware.ts.

const SITE = "https://rimzzlabs.com";

function prefix(lang: Lang): string {
	return lang === "en" ? "" : `/${lang}`;
}

function isoDate(value: string): string {
	return new Date(value).toISOString().slice(0, 10);
}

function noteUrl(lang: Lang, slug: string): string {
	return `${SITE}${prefix(lang)}/notes/${slug}`;
}

function noteLine(lang: Lang, { slug, note }: LocalizedNote): string {
	return `- [${note.data.title}](${noteUrl(lang, slug)}) (${isoDate(note.data.publishedAt)}) — ${note.data.description}`;
}

export function markdownResponse(body: string): Response {
	return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}

export function buildHomeMarkdown(lang: Lang, notes: Array<LocalizedNote>): string {
	const t = getDictionary(lang);
	const p = prefix(lang);
	const jobs = EXPERIENCE_COMPANIES.map(({ key, company, url }) => {
		const item = t.experience.items[key];
		return `- **${item.title}**, [${company}](${url}) (${item.period}) — ${item.summary}`;
	});

	return [
		"# Rizki Citra — Software Engineer",
		"",
		`${t.hero.p1} ${t.hero.p2}`,
		"",
		`## ${t.experience.heading}`,
		"",
		...jobs,
		"",
		`## ${t.notesPage.title}`,
		"",
		t.notesPage.description,
		"",
		...notes.slice(0, 5).map((note) => noteLine(lang, note)),
		"",
		`All notes: ${SITE}${p}/notes`,
		"",
		`## ${t.nav.guestbook}`,
		"",
		`${t.guestbook.description} ${SITE}${p}/guestbook`,
		"",
		"## Machine-readable resources",
		"",
		"- This page, the notes index, and every note are served as markdown when the request includes `Accept: text/markdown`.",
		`- OpenAPI description of the public API: ${SITE}/openapi.json`,
		`- API catalog (RFC 9727): ${SITE}/.well-known/api-catalog`,
		`- Agent skills: ${SITE}/.well-known/agent-skills/index.json`,
		"",
	].join("\n");
}

export function buildNotesIndexMarkdown(lang: Lang, notes: Array<LocalizedNote>): string {
	const t = getDictionary(lang).notesPage;
	return [
		`# ${t.title}`,
		"",
		t.description,
		"",
		...notes.map((note) => noteLine(lang, note)),
		"",
	].join("\n");
}

export function buildNoteMarkdown(lang: Lang, localized: LocalizedNote): string {
	const { slug, note, translated } = localized;
	const t = getDictionary(lang).notesPage;
	const lines = [
		`# ${note.data.title}`,
		"",
		`> ${note.data.description}`,
		"",
		`- ${t.publishedOn}: ${isoDate(note.data.publishedAt)}`,
		`- ${t.writtenBy}: Rizki Citra (${SITE})`,
		`- Canonical: ${noteUrl(lang, slug)}`,
	];
	if (lang !== "en" && !translated) {
		lines.push("", `> ${t.notTranslated}`);
	}
	lines.push("", "---", "", note.body ?? "");
	return lines.join("\n");
}
