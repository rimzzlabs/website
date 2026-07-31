import { TZDateMini } from "@date-fns/tz";
import { format, formatDistanceToNow, type Locale } from "date-fns";
import { enGB, id as idID } from "date-fns/locale";
import { DEFAULT_LOCALE, type Lang } from "@/i18n/config";

const locales: Record<Lang, Locale> = {
	en: enGB,
	id: idID,
};

export const SITE_TIME_ZONE = "Asia/Jakarta";

interface FormatWithTokenConfig {
	date: string | number | Date;
	lang: "en" | "id";
	timeZone?: string;
}

export function viewerTimeZone() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || SITE_TIME_ZONE;
	} catch {
		return SITE_TIME_ZONE;
	}
}

export function createDateFormat(token: string) {
	return function formatWithToken(config: FormatWithTokenConfig) {
		const { date, lang, timeZone = SITE_TIME_ZONE } = config;

		try {
			const value = new TZDateMini(new Date(date), timeZone);
			return format(value, token, { locale: locales[lang] });
		} catch {
			return "-";
		}
	};
}

export function formatRelativeTime(date: string | Date | number, lang: Lang = DEFAULT_LOCALE) {
	try {
		return formatDistanceToNow(new Date(date), { addSuffix: true, locale: locales[lang] });
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

export const formatDate = createDateFormat("EEE, d MMMM yyyy");
