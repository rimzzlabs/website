import type { ImageMetadata } from "astro";
import classroom from "@/assets/classroom.webp";
import coinfest0 from "@/assets/coinfest-0.webp";
import coinfest1 from "@/assets/coinfest-1.webp";
import coinfest2 from "@/assets/coinfest-2.webp";
import festPass from "@/assets/fest-pass.webp";
import finalAssignment0 from "@/assets/final-assignment-0.webp";
import graduation0 from "@/assets/graduation-0.webp";
import laptop from "@/assets/laptop.webp";
import pc0 from "@/assets/pc-0.webp";
import pc1 from "@/assets/pc-1.webp";
import pc2 from "@/assets/pc-2.webp";
import pcLabs from "@/assets/pc-labs.webp";
import rebuild0 from "@/assets/rebuild-0.webp";
import rebuild1 from "@/assets/rebuild-1.webp";
import rebuild2 from "@/assets/rebuild-2.webp";
import rebuild3 from "@/assets/rebuild-3.webp";
import selfie from "@/assets/selfie.webp";
import wfc0 from "@/assets/wfc-0.webp";
import wfc1 from "@/assets/wfc-1.webp";

/**
 * A build-time optimized archive photo: a resized fallback `src`, a responsive
 * `srcSet`, and the intrinsic dimensions for aspect-ratio reservation. Produced by
 * `getOptimizedImagesByYear` (server-only) and threaded into the island as props,
 * since `getImage` can't run inside a React island.
 */
export type OptimizedImage = {
	src: string;
	srcSet: string;
	width: number;
	height: number;
};

// Images are structural and keyed by year in display order; their localized alt
// text (and the title + descriptions) come from the dictionary. Shared by the
// archive timeline island and the image sitemap endpoint (`sitemap-images.xml`).
export const imagesByYear: Record<number, Array<ImageMetadata>> = {
	2026: [],
	2025: [],
	2024: [festPass, coinfest1, coinfest0, coinfest2, finalAssignment0, graduation0],
	2023: [rebuild1, rebuild0, rebuild3, rebuild2],
	2022: [wfc0, wfc1],
	2021: [selfie, laptop],
	2020: [pc0, pc1, pc2],
	2019: [classroom, pcLabs],
};
