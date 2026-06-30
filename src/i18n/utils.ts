import { DEFAULT_LOCALE, isLang, type Lang } from "./config";

/**
 * Derive the active locale from a pathname. Default-locale pages are unprefixed,
 * so anything under `/id` is Indonesian and everything else is English.
 */
export function getLangFromPath(pathname: string): Lang {
	const first = pathname.split("/").filter(Boolean)[0];
	return isLang(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/** Strip a leading locale segment, returning the locale-agnostic path (always starts with `/`). */
export function stripLocale(pathname: string): string {
	const segments = pathname.split("/").filter(Boolean);
	if (isLang(segments[0]) && segments[0] !== DEFAULT_LOCALE) segments.shift();
	return `/${segments.join("/")}`;
}

/** Rewrite a path to its equivalent in `target` — pure prefix math (slugs are identical across locales). */
export function localizePath(pathname: string, target: Lang): string {
	const base = stripLocale(pathname);
	if (target === DEFAULT_LOCALE) return base;
	return base === "/" ? "/id" : `/id${base}`;
}

/** Split a content-collection id of the form `en/some-slug` into its locale and slug. */
export function parseNoteId(id: string): { lang: Lang; slug: string } {
	const [maybeLang, ...rest] = id.split("/");
	if (isLang(maybeLang)) return { lang: maybeLang, slug: rest.join("/") };
	return { lang: DEFAULT_LOCALE, slug: id };
}
