import { type CollectionEntry, getCollection } from "astro:content";
import { DEFAULT_LOCALE, type Lang } from "@/i18n/config";
import { parseNoteId } from "@/i18n/utils";

export type Note = CollectionEntry<"notes">;

export type LocalizedNote = { slug: string; note: Note; translated: boolean };

function isPublished(note: Note) {
	return import.meta.env.PROD ? note.data.status === "published" : true;
}

/**
 * Notes for `lang`, sorted newest-first, falling back to the English entry when a
 * translation is missing. `translated` is false when the entry is the fallback.
 */
export async function getNotes(lang: Lang): Promise<Array<LocalizedNote>> {
	const all = await getCollection("notes");
	const bySlug = new Map<string, Partial<Record<Lang, Note>>>();

	for (const note of all) {
		const { lang: noteLang, slug } = parseNoteId(note.id);
		bySlug.set(slug, { ...bySlug.get(slug), [noteLang]: note });
	}

	const result: Array<LocalizedNote> = [];
	for (const [slug, entry] of bySlug) {
		const localized = entry[lang];
		const note = localized ?? entry[DEFAULT_LOCALE];
		if (!note || !isPublished(note)) continue;
		result.push({ slug, note, translated: Boolean(localized) });
	}

	return result.sort(
		(a, b) =>
			new Date(b.note.data.publishedAt).getTime() - new Date(a.note.data.publishedAt).getTime(),
	);
}
