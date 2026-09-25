import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import {
	getDictionary,
	HTML_LANG,
	type Locale,
	localeStaticPaths,
} from "@/i18n";
import { getNotes } from "@/lib/notes";

export function getStaticPaths() {
	return localeStaticPaths();
}

export const GET: APIRoute = async (context) => {
	const locale = (context.props as { locale: Locale }).locale;
	const t = getDictionary(locale);
	const notes = await getNotes(locale);

	return rss({
		title: t.notes.seoTitle,
		description: t.notes.seoDescription,
		site: context.site ?? "https://rimzzlabs.com",
		items: notes.map((note) => ({
			title: note.data.title,
			description: note.data.description,
			pubDate: new Date(note.dateISO),
			link: `${note.url}/`,
			categories: note.data.keywords,
		})),
		customData: `<language>${HTML_LANG[locale]}</language>`,
	});
};
