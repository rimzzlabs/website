import { buildNotesIndexMarkdown, markdownResponse } from "@/lib/markdown-pages";
import { getNotes } from "@/lib/notes";

export async function GET(): Promise<Response> {
	return markdownResponse(buildNotesIndexMarkdown("id", await getNotes("id")));
}
