import { getNotes } from "@/lib/notes";

// Build-time search index for the `/notes/*` edge function (functions/notes/[[slug]].ts).
// The function can't import `astro:content` at the edge, so it fetches this prerendered
// JSON asset to know the published slugs + titles. Static output emits it to /notes-index.json.
export async function GET(): Promise<Response> {
	const notes = await getNotes("en");
	const index = notes.map(({ slug, note }) => ({ slug, title: note.data.title }));
	return new Response(JSON.stringify(index), {
		headers: { "content-type": "application/json" },
	});
}
