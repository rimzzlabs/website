import { getImage } from "astro:assets";
import { A, AR, G, pipe } from "@mobily/ts-belt";
import coinfestAstronaut from "@/assets/images/coinfest-1.webp";
import coinfest from "@/assets/images/coinfest-2.webp";
import innovateX from "@/assets/images/innovate-x-2026-group-photo.webp";
import interview from "@/assets/images/interview.webp";
import potrait from "@/assets/images/potrait.png";
import selfie from "@/assets/images/selfie.webp";
import type { ImageGallery } from "@/components/home/home-gallery";
import type { Locale } from "@/i18n/config";

const IMAGES = [
	{
		src: potrait,
		alt: {
			en: "Rizki's studio portrait wearing a white T-shirt",
			id: "Potret studio Rizki memakai kaus putih",
		},
	},
	{
		src: coinfest,
		alt: {
			en: "Rizki's selfie at a Coinfest Asia booth in Bali",
			id: "Swafoto Rizki di salah satu booth Coinfest Asia, Bali",
		},
	},
	{
		src: interview,
		alt: {
			en: "Rizki shows a laptop screen to a man at a roadside stall at night",
			id: "Rizki menunjukkan layar laptop ke seorang bapak di warung pinggir jalan pada malam hari",
		},
	},
	{
		src: selfie,
		alt: {
			en: "Rizki smiles in a motorcycle helmet and gives a thumbs up",
			id: "Rizki tersenyum memakai helm motor sambil mengacungkan jempol",
		},
	},
	{
		src: innovateX,
		alt: {
			en: "Rizki, Prof. Wen Yonggang of NTU, and Rizky at InnovateX 2026",
			id: "Rizki, Prof. Wen Yonggang dari NTU, dan Rizky di InnovateX 2026",
		},
	},
	{
		src: coinfestAstronaut,
		alt: {
			en: "Rizki's selfie with an astronaut mascot at Coinfest Asia",
			id: "Swafoto Rizki bersama maskot astronot di Coinfest Asia",
		},
	},
] as const;

async function optimizeImage(
	entry: (typeof IMAGES)[number],
	locale: Locale,
): Promise<ImageGallery> {
	const img = entry.src;
	const alt = entry.alt[locale];
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

export async function getImageGallery(
	locale: Locale,
): Promise<ReadonlyArray<ImageGallery>> {
	const results = await pipe(
		IMAGES,
		A.map((entry) =>
			pipe(AR.make(optimizeImage(entry, locale)), AR.toUndefined),
		),
		(images) => Promise.all(images),
	);
	return A.filter(results, G.isNotNullable);
}
