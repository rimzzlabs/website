import { getDictionary, LOCALES, type Locale, localizePath } from "@/i18n";

export interface NavigationLink {
	label: string;
	href: string;
}

export function getNavigationLinks(locale: Locale): Array<NavigationLink> {
	const t = getDictionary(locale).nav;
	return [
		{ label: t.home, href: localizePath("/", locale) },
		{ label: t.notes, href: localizePath("/notes", locale) },
		{ label: t.guestbook, href: localizePath("/guestbook", locale) },
	];
}

export function isCurrentLink(href: string, pathname: string) {
	const path = pathname.replace(/\/$/, "") || "/";
	if (path === href) return true;
	const isHome = LOCALES.some((locale) => localizePath("/", locale) === href);
	return !isHome && path.startsWith(`${href}/`);
}
