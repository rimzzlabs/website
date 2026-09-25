import { getImage } from "astro:assets";
import { A, AR, G, pipe } from "@mobily/ts-belt";
import coinfestAstronaut from "@/assets/images/coinfest-1.webp";
import coinfest from "@/assets/images/coinfest-2.webp";
import innovateX from "@/assets/images/innovate-x-2026-group-photo.webp";
import interview from "@/assets/images/interview.webp";
import potrait from "@/assets/images/potrait.png";
import selfie from "@/assets/images/selfie.webp";
import type { ImageGallery } from "@/components/home/home-gallery";

const IMAGES = [
	[potrait, "Rizki's studio potrait wearing white T-Shirt"],
	[coinfest, "Rizki's selfie at a Coinfest Asia booth in Bali"],
	[
		interview,
		"Rizki shows a laptop screen to a man at a roadside stall at night",
	],
	[selfie, "Rizki smiles in a motorcycle helmet and gives a thumbs up"],
	[innovateX, "Rizki, Prof. Wen Yonggang of NTU, and Rizky at InnovateX 2026"],
	[
		coinfestAstronaut,
		"Rizki's selfie with an astronaut mascot at Coinfest Asia",
	],
] as const;

async function optimizeImage(
	entry: (typeof IMAGES)[number],
): Promise<ImageGallery> {
	const [img, alt] = entry;
	const [thumb, full] = await Promise.all([
		getImage({ src: img, width: 800, format: "webp" }),
		getImage({ src: img, width: Math.min(1920, img.width), format: "webp" }),
	]);
	return {
		alt,
		thumb: {
			src: thumb.src,
			width: Number(thumb.attributes.width),
			height: Number(thumb.attributes.height),
		},
		full: {
			src: full.src,
			width: Number(full.attributes.width),
			height: Number(full.attributes.height),
		},
	};
}

export async function getImageGallery(): Promise<ReadonlyArray<ImageGallery>> {
	const results = await pipe(
		IMAGES,
		A.map((entry) => pipe(AR.make(optimizeImage(entry)), AR.toUndefined)),
		(images) => Promise.all(images),
	);
	return A.filter(results, G.isNotNullable);
}
