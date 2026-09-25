import { localeFromPath, stripLocale } from "@/i18n/config";

export const OG_PAGES = [
	"notes",
	"guestbook",
	"now",
	"archive",
	"privacy",
	"accessibility",
	"feedback",
] as const;

const NOTE_PATH = /^notes\/[^/]+$/;

function toOgKey(path: string) {
	if (OG_PAGES.some((page) => page === path)) return path;
	if (NOTE_PATH.test(path)) return path;
	return "home";
}

/** The generated Open Graph image for a page. Unknown pages use the home card. */
export function ogImagePath(pathname: string) {
	const locale = localeFromPath(pathname);
	const path = stripLocale(pathname).replace(/^\/|\/$/g, "");
	return `/og/${locale}/${toOgKey(path)}.png`;
}
