export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";

export const HTML_LANG: Record<Locale, string> = {
	en: "en-US",
	id: "id-ID",
};

export const LOCALE_NAMES: Record<Locale, string> = {
	en: "English",
	id: "Indonesia",
};

export function isLocale(value: unknown): value is Locale {
	return LOCALES.includes(value as Locale);
}

export function toLocale(value: unknown): Locale {
	if (isLocale(value)) return value;
	return DEFAULT_LOCALE;
}

export function stripLocale(pathname: string) {
	const stripped = pathname.replace(/^\/id(?=\/|$)/, "");
	if (stripped === "") return "/";
	return stripped;
}

function withTrailingSlash(path: string) {
	if (path.endsWith("/") || /\.[a-z0-9]+$/i.test(path)) return path;
	return `${path}/`;
}

export function localizePath(pathname: string, locale: Locale) {
	const path = withTrailingSlash(stripLocale(pathname));
	if (locale === DEFAULT_LOCALE) return path;
	return `/${locale}${path}`;
}

export function localeFromPath(pathname: string): Locale {
	if (/^\/id(?=\/|$)/.test(pathname)) return "id";
	return DEFAULT_LOCALE;
}

/** getStaticPaths entries for a page that exists in every locale. */
export function localeStaticPaths() {
	return LOCALES.map((locale) => ({
		params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
		props: { locale },
	}));
}
