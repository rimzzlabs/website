export function toMarkdownPath(pathname: string) {
	const clean = pathname.replace(/\/+$/, "");
	if (clean === "") return "/md/index.md";
	if (clean === "/id") return "/md/id/index.md";
	return `/md${clean}.md`;
}
