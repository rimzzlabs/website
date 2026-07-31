import { useEffect, useState } from "react";
import type { Lang } from "@/i18n/config";
import { createDateFormat, formatRelativeTime, SITE_TIME_ZONE, viewerTimeZone } from "@/lib/date";

const formatShort = createDateFormat("d MMM yyyy");
const formatFull = createDateFormat("dd, MMM yyyy - hh:mm:ss a");

export type Timestamp = { label: string; full: string };

function prerendered(date: string | number | Date, lang: Lang): Timestamp {
	return {
		label: formatShort({ date, lang, timeZone: SITE_TIME_ZONE }),
		full: formatFull({ date, lang, timeZone: SITE_TIME_ZONE }),
	};
}

export function useTimestamp(date: string | number | Date, lang: Lang): Timestamp {
	const [timestamp, setTimestamp] = useState(() => prerendered(date, lang));

	useEffect(() => {
		setTimestamp({
			label: formatRelativeTime(date, lang),
			full: formatFull({ date, lang, timeZone: viewerTimeZone() }),
		});
	}, [date, lang]);

	return timestamp;
}
