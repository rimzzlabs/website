import { HTML_LANG, type Locale, localizePath } from "@/i18n/config";

export const RIZKY_URL = "https://rizzky.xyz";
export const AMBULANCE_ZIG_ZAG_URL =
	"https://open.spotify.com/track/6GURHg5e4zPOa6SOJz3ZpG";

export function ntuNoteUrl(locale: Locale) {
	return localizePath(
		"/notes/my-first-trip-abroad-was-a-hackathon-at-ntu",
		locale,
	);
}

export function formatRupiah(amount: number, locale: Locale) {
	return new Intl.NumberFormat(HTML_LANG[locale], {
		style: "currency",
		currency: "IDR",
		currencyDisplay: "narrowSymbol",
		maximumFractionDigits: 0,
	}).format(amount);
}
