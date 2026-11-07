import type { ImageMetadata } from "astro";

export type TrustedHtml = string;

export interface ArchivePhoto {
	src: ImageMetadata;
	alt: string;
}

export interface ArchiveSection {
	heading: string;
	paragraphs: ReadonlyArray<TrustedHtml>;
	figure?: "burn-classification";
	photos?: ReadonlyArray<ArchivePhoto>;
}

export interface ArchiveYear {
	year: number;
	title: string;
	paragraphs: ReadonlyArray<TrustedHtml>;
	sections?: ReadonlyArray<ArchiveSection>;
	photos: ReadonlyArray<ArchivePhoto>;
}
