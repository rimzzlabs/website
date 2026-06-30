import { DEFAULT_LOCALE, type Lang } from "@/i18n/config";

const DATE_LOCALE: Record<Lang, string> = {
	en: "en-GB",
	id: "id-ID",
};

const formatters: Record<Lang, Intl.DateTimeFormat> = {
	en: new Intl.DateTimeFormat(DATE_LOCALE.en, {
		day: "numeric",
		weekday: "short",
		month: "long",
		year: "numeric",
	}),
	id: new Intl.DateTimeFormat(DATE_LOCALE.id, {
		day: "numeric",
		weekday: "short",
		month: "long",
		year: "numeric",
	}),
};

export function formatDate(date: string | Date | number, lang: Lang = DEFAULT_LOCALE) {
	try {
		return formatters[lang].format(new Date(date));
	} catch {
		return "-";
	}
}

export function dateToISO(date: string | Date | number) {
	try {
		return new Date(date).toISOString();
	} catch {
		return "-";
	}
}
