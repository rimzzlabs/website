import { getNotes } from "@/lib/notes";

// Indonesian build-time search index for the `/id/notes/*` edge function
// (functions/id/notes/[[slug]].ts). Slugs match the English index, but titles
// are localized so "did you mean…?" suggestions read in Indonesian. Emitted to
// /id/notes-index.json.
export async function GET(): Promise<Response> {
	const notes = await getNotes("id");
	const index = notes.map(({ slug, note }) => ({ slug, title: note.data.title }));
	return new Response(JSON.stringify(index), {
		headers: { "content-type": "application/json" },
	});
}
