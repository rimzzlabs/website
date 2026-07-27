import { buildHomeMarkdown, markdownResponse } from "@/lib/markdown-pages";
import { getNotes } from "@/lib/notes";

export async function GET(): Promise<Response> {
	return markdownResponse(buildHomeMarkdown("id", await getNotes("id")));
}
