export const LOCALES = ["en", "id"] as const;

export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Lang = "en";

export function isLang(value: unknown): value is Lang {
	return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
