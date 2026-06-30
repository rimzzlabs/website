import { handleNotesRequest, type PagesContext } from "../../_lib/notes-router";

// Cloudflare Pages Function owning every request under `/id/notes/*`. Mirrors the
// English function so Indonesian note-misses get the same branded, localized
// not-found and "did you mean…?" experience. See functions/_lib/notes-router.ts.
export function onRequest(context: PagesContext): Promise<Response> {
	return handleNotesRequest(context, {
		basePath: "/id/notes",
		indexPath: "/id/notes-index.json",
		notFoundPath: "/id/notes/not-found/index.html",
	});
}
