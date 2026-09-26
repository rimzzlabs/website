import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

import { SITE } from "@/lib/agent/site";

export async function imageMarkdown(alt: string, image: ImageMetadata) {
	const optimized = await getImage({ src: image, format: "webp" });
	return `![${alt}](${SITE}${optimized.src})`;
}
