import { readdirSync, readFileSync } from "node:fs";

const NOTES_DIR = "src/content/notes";
const LOCALE_PREFIX = { en: "", id: "/id" };

/**
 * @param {string} source
 * @param {string} key
 */
function readDate(source, key) {
	const match = source.match(
		new RegExp(`^${key}:\\s*"(\\d{2})/(\\d{2})/(\\d{4})"`, "m"),
	);
	if (!match) return undefined;
	return `${match[3]}-${match[1]}-${match[2]}`;
}

/**
 * Maps each note URL to its last update date, for the sitemap `lastmod`.
 * @param {string} site
 * @returns {Map<string, string>}
 */
export function noteLastmod(site) {
	const entries = Object.entries(LOCALE_PREFIX).flatMap(([locale, prefix]) =>
		readdirSync(`${NOTES_DIR}/${locale}`)
			.filter((file) => /\.mdx?$/.test(file))
			.map((file) => {
				const source = readFileSync(`${NOTES_DIR}/${locale}/${file}`, "utf8");
				const slug = file.replace(/\.mdx?$/, "");
				const date =
					readDate(source, "updatedAt") ?? readDate(source, "publishedAt");
				return [`${site}${prefix}/notes/${slug}/`, date];
			}),
	);
	return new Map(entries.filter((entry) => entry[1] !== undefined));
}
