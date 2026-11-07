const LABEL = "(?!-)[a-z0-9-]{1,63}(?<!-)";
const TLD = "(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})";
const HOSTNAME_PATTERN = new RegExp(`^(?:${LABEL}\\.)+${TLD}$`);

/**
 * Returns a safe, normalized website URL, or null if the input is not a real
 * public website: http(s) only, a valid hostname with a letter TLD, and no
 * credentials or custom port.
 */
export function toWebsiteUrl(raw: string | null | undefined) {
	const site = raw?.trim();
	if (!site) return null;

	const candidate = /^https?:\/\//i.test(site) ? site : `https://${site}`;
	if (!URL.canParse(candidate)) return null;

	const url = new URL(candidate);
	if (url.username || url.password || url.port) return null;
	if (url.hostname.length > 253 || !HOSTNAME_PATTERN.test(url.hostname)) {
		return null;
	}
	return url.href;
}

export function toWebsiteLabel(href: string) {
	const url = new URL(href);
	const path = url.pathname.replace(/\/$/, "");
	return `${url.hostname}${path}`;
}
