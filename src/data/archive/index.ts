import type { Locale } from "@/i18n/config";
import { ARCHIVE_EN } from "./en";
import { ARCHIVE_ID } from "./id";
import type { ArchiveYear } from "./types";

const ARCHIVE: Record<Locale, ReadonlyArray<ArchiveYear>> = {
	en: ARCHIVE_EN,
	id: ARCHIVE_ID,
};

export function getArchive(locale: Locale) {
	return ARCHIVE[locale];
}

export type { ArchiveSection, ArchiveYear } from "./types";
