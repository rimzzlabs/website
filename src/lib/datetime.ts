import { F, pipe, R } from "@mobily/ts-belt";
import { DEFAULT_LOCALE, HTML_LANG, type Locale } from "@/i18n/config";

export const SITE_TIME_ZONE = "Asia/Jakarta";
const SITE_UTC_OFFSET = "+07:00";

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = { dateStyle: "medium" };

export function parsePublishedAt(publishedAt: string) {
	const [month, day, year] = publishedAt.split("/");
	return new Date(`${year}-${month}-${day}T00:00:00${SITE_UTC_OFFSET}`);
}

export function formatDate(
	options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT,
	locale: Locale = DEFAULT_LOCALE,
) {
	const fmt = new Intl.DateTimeFormat(HTML_LANG[locale], {
		...options,
		timeZone: SITE_TIME_ZONE,
	});
	return (date: string | number | Date) =>
		pipe(
			R.fromExecution(() => fmt.format(new Date(date))),
			R.map((res) => res),
			R.tapError(() => {
				if (import.meta.env.PROD) return;
				console.info("Invalid datetime value");
			}),
			R.match(F.identity, () => ""),
		);
}

const RELATIVE_UNITS: ReadonlyArray<[Intl.RelativeTimeFormatUnit, number]> = [
	["year", 31_536_000],
	["month", 2_592_000],
	["week", 604_800],
	["day", 86_400],
	["hour", 3_600],
	["minute", 60],
];

export function formatRelative(
	date: string | number | Date,
	now: number,
	locale: Locale = DEFAULT_LOCALE,
) {
	const fmt = new Intl.RelativeTimeFormat(HTML_LANG[locale], {
		numeric: "auto",
	});
	const seconds = (new Date(date).getTime() - now) / 1000;
	const unit = RELATIVE_UNITS.find((entry) => Math.abs(seconds) >= entry[1]);
	if (!unit) return fmt.format(0, "second");
	return fmt.format(Math.round(seconds / unit[1]), unit[0]);
}
