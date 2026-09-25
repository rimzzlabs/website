import { F, pipe, R } from "@mobily/ts-belt";

export const SITE_LOCALE = "en-US";
export const SITE_TIME_ZONE = "Asia/Jakarta";
const SITE_UTC_OFFSET = "+07:00";

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = { dateStyle: "medium" };

export function parsePublishedAt(publishedAt: string) {
	const [month, day, year] = publishedAt.split("/");
	return new Date(`${year}-${month}-${day}T00:00:00${SITE_UTC_OFFSET}`);
}

export function formatDate(
	options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT,
	locale = SITE_LOCALE,
) {
	const fmt = new Intl.DateTimeFormat(locale, {
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
