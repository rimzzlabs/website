import { getDictionary, type Locale, localizePath } from "@/i18n";

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
