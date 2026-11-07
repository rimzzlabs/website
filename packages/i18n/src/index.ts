import type { Locale } from "./config";
import { type Dictionary, en } from "./en";
import { id } from "./id";

const DICTIONARIES: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale) {
	return DICTIONARIES[locale];
}

export * from "./config";
export { fill } from "./fill";
export type { Dictionary };
