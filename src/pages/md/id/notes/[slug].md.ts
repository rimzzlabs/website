import type { APIContext } from "astro";
import { buildNoteMarkdown, markdownResponse } from "@/lib/markdown-pages";
import { getNotes, type LocalizedNote } from "@/lib/notes";

export async function getStaticPaths() {
	const notes = await getNotes("id");
	return notes.map((localized) => ({ params: { slug: localized.slug }, props: { localized } }));
}

export function GET(context: APIContext): Response {
	const { localized } = context.props as { localized: LocalizedNote };
	return markdownResponse(buildNoteMarkdown("id", localized));
}
