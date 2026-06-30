import { handleNotesRequest, type PagesContext } from "../_lib/notes-router";

// Cloudflare Pages Function owning every request under `/notes/*`. The site is
// static, so this is where unknown-slug handling runs per-request. See
// functions/_lib/notes-router.ts for the shared behavior.
export function onRequest(context: PagesContext): Promise<Response> {
	return handleNotesRequest(context, {
		basePath: "/notes",
		indexPath: "/notes-index.json",
		notFoundPath: "/notes/not-found/index.html",
	});
}
