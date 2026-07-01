import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import { imagesByYear, type OptimizedImage } from "./archive-images";

// Both display contexts are small — grid tiles render at ~180px and the carousel
// caps at 364px — so we cap the base render at 800px (enough for a 2x carousel)
// and hand the browser a 200/400/800 srcset. `getImage` is server-only and can't
// run inside the React island, so we optimize here at build time and pass plain,
// serializable image data down as props (and reuse it for the image sitemap).
const PHOTO_MAX_WIDTH = 800;
const PHOTO_WIDTHS = [200, 400, 800];

async function optimize(image: ImageMetadata): Promise<OptimizedImage> {
	const result = await getImage({
		src: image,
		width: Math.min(PHOTO_MAX_WIDTH, image.width),
		widths: PHOTO_WIDTHS,
		format: "webp",
	});
	return {
		src: result.src,
		srcSet: result.srcSet.attribute,
		width: result.attributes.width,
		height: result.attributes.height,
	};
}

export async function getOptimizedImagesByYear(): Promise<Record<number, Array<OptimizedImage>>> {
	const entries = await Promise.all(
		Object.entries(imagesByYear).map(async ([year, images]) => {
			const optimized = await Promise.all(images.map(optimize));
			return [Number(year), optimized] as const;
		}),
	);
	return Object.fromEntries(entries);
}
