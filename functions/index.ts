import {
	DEFAULT_LOCALE,
	isLocale,
	LOCALE_COOKIE,
	type Locale,
	localizePath,
} from "../src/i18n/config";

interface RootContext {
	request: Request;
	next: () => Promise<Response>;
}

const COOKIE_PATTERN = new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`);

function readCookieLocale(request: Request) {
	const value = request.headers.get("cookie")?.match(COOKIE_PATTERN)?.[1];
	if (isLocale(value)) return value;
	return null;
}

function toLanguageRange(part: string) {
	const [tag, ...params] = part.trim().split(";");
	const base = tag.toLowerCase().split("-")[0];
	const quality = params.find((param) => param.trim().startsWith("q="));
	if (!quality) return { base, quality: 1 };
	return { base, quality: Number(quality.split("=")[1]) };
}

function readPreferredLocale(request: Request): Locale {
	const header = request.headers.get("accept-language") ?? "";
	const ranked = header
		.split(",")
		.map(toLanguageRange)
		.filter((range) => range.base && !Number.isNaN(range.quality))
		.sort((a, b) => b.quality - a.quality);

	const match = ranked.find((range) => isLocale(range.base));
	if (match && isLocale(match.base)) return match.base;
	return DEFAULT_LOCALE;
}

export async function onRequestGet(context: RootContext) {
	const locale =
		readCookieLocale(context.request) ?? readPreferredLocale(context.request);

	if (locale === DEFAULT_LOCALE) {
		const response = await context.next();
		const headers = new Headers(response.headers);
		headers.append("Vary", "Accept-Language, Cookie");
		return new Response(response.body, { status: response.status, headers });
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: localizePath("/", locale),
			Vary: "Accept-Language, Cookie",
		},
	});
}
