const formatter = new Intl.DateTimeFormat("en-gb", {
	day: "numeric",
	weekday: "short",
	month: "long",
	year: "numeric",
});

export function formatDate(date: string | Date | number) {
	try {
		return formatter.format(new Date(date));
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
