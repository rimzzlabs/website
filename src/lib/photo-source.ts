import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const THUMB_WIDTHS = [400, 800, 1200];
const FULL_MAX_WIDTH = 1920;

interface ImageSize {
	src: string;
	width: number;
	height: number;
}

export interface PhotoSource {
	alt: string;
	thumb: ImageSize & { srcSet: string };
	full: ImageSize;
}

export interface PhotoInput {
	src: ImageMetadata;
	alt: string;
}

export async function toPhotoSource(input: PhotoInput): Promise<PhotoSource> {
	const fullWidth = Math.min(FULL_MAX_WIDTH, input.src.width);
	const [thumb, full] = await Promise.all([
		getImage({ src: input.src, widths: THUMB_WIDTHS, format: "webp" }),
		getImage({ src: input.src, width: fullWidth, format: "webp" }),
	]);

	return {
		alt: input.alt,
		thumb: {
			src: thumb.src,
			srcSet: thumb.srcSet.attribute,
			width: input.src.width,
			height: input.src.height,
		},
		full: {
			src: full.src,
			width: fullWidth,
			height: Math.round(input.src.height * (fullWidth / input.src.width)),
		},
	};
}
