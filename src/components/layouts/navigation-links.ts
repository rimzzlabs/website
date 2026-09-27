import { getDictionary, LOCALES, type Locale, localizePath } from "@/i18n";

export type NavigationLinkId =
	| "home"
	| "notes"
	| "guestbook"
	| "archive"
	| "now";

export interface NavigationLink {
	id: NavigationLinkId;
	label: string;
	href: string;
}

export function getNavigationLinks(locale: Locale): Array<NavigationLink> {
	const t = getDictionary(locale).nav;
	return [
		{ id: "home", label: t.home, href: localizePath("/", locale) },
		{ id: "notes", label: t.notes, href: localizePath("/notes", locale) },
		{ id: "now", label: t.now, href: localizePath("/now", locale) },
		{
			id: "guestbook",
			label: t.guestbook,
			href: localizePath("/guestbook", locale),
		},
		{ id: "archive", label: t.archive, href: localizePath("/archive", locale) },
	];
}

export function isCurrentLink(href: string, pathname: string) {
	const path = pathname.replace(/\/$/, "") || "/";
	if (path === href) return true;
	const isHome = LOCALES.some((locale) => localizePath("/", locale) === href);
	return !isHome && path.startsWith(`${href}/`);
}
