import { type Locale, localizePath } from "@/i18n";

export const SITE = import.meta.env.SITE.replace(/\/$/, "");

export function siteUrl(path: string, locale: Locale) {
	return `${SITE}${localizePath(path, locale)}`;
}

export function withAbsoluteLinks(markdown: string) {
	return markdown.replace(/\]\(\//g, `](${SITE}/`);
}
