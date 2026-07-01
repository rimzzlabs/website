import type { APIRoute } from "astro";
import type { OptimizedImage } from "@/components/home/archive/archive-images";
import { getOptimizedImagesByYear } from "@/components/home/archive/archive-optimized";
import { LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

// The archive lives on each locale's homepage, but its photos sit inside
// collapsed accordion panels — hidden markup that image crawlers skip. This
// image sitemap declares every archive photo (with its localized caption)
// against the page that hosts it, the channel Google supports for surfacing
// images that aren't prominently rendered.

const LOCALE_PATH: Record<(typeof LOCALES)[number], string> = { en: "", id: "id/" };

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function urlEntry(
	lang: (typeof LOCALES)[number],
	site: URL,
	imagesByYear: Record<number, Array<OptimizedImage>>,
): string {
	const timeline = getDictionary(lang).archive.timeline;
	const pageLoc = new URL(LOCALE_PATH[lang], site).href;

	const images = Object.entries(imagesByYear).flatMap(([year, assets]) => {
		const entry = timeline[year as keyof typeof timeline];
		return assets.map((image, i) => {
			const loc = new URL(image.src, site).href;
			const caption = entry.photoAlts[i] ?? "";
			return `\t\t<image:image>\n\t\t\t<image:loc>${escapeXml(loc)}</image:loc>${
				caption ? `\n\t\t\t<image:caption>${escapeXml(caption)}</image:caption>` : ""
			}\n\t\t</image:image>`;
		});
	});

	return `\t<url>\n\t\t<loc>${escapeXml(pageLoc)}</loc>\n${images.join("\n")}\n\t</url>`;
}

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("`site` must be configured to build the image sitemap");

	const imagesByYear = await getOptimizedImagesByYear();
	const urls = LOCALES.map((lang) => urlEntry(lang, site, imagesByYear)).join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml" },
	});
};
