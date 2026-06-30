import type { Lang } from "./config";
import { type Dictionary, en } from "./en";
import { id } from "./id";

const dictionaries: Record<Lang, Dictionary> = { en, id };

export function getDictionary(lang: Lang): Dictionary {
	return dictionaries[lang];
}

export type { Dictionary };
