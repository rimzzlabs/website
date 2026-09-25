import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp, { type Sharp } from "sharp";

import { type OgCard, toCardTree } from "./cards";
import { OG_SIZE, type OgAssets } from "./elements";

const FONT_DIR = "src/assets/og/fonts";
const PORTRAIT = "src/assets/images/potrait.png";

// The same head-and-chest crop as the favicons.
const AVATAR_CROP = { left: 177, top: 10, width: 900, height: 900 };
const PORTRAIT_CROP = { left: 150, top: 0, width: 954, height: 1150 };

const AVATAR_TIMEOUT_MS = 5_000;

async function toDataUrl(image: Sharp) {
	const png = await image.png().toBuffer();
	return `data:image/png;base64,${png.toString("base64")}`;
}

async function loadFonts() {
	const font = (name: string) => readFile(`${FONT_DIR}/${name}.woff`);
	return [
		{ name: "Lora", data: await font("lora-600"), weight: 600 as const },
		{ name: "Inter", data: await font("inter-400"), weight: 400 as const },
		{ name: "Inter", data: await font("inter-500"), weight: 500 as const },
		{ name: "Mono", data: await font("mono-500"), weight: 500 as const },
	];
}

async function loadAssets(): Promise<OgAssets> {
	const source = await readFile(PORTRAIT);
	return {
		avatar: await toDataUrl(
			sharp(source).extract(AVATAR_CROP).resize(128, 128),
		),
		portrait: await toDataUrl(
			sharp(source).extract(PORTRAIT_CROP).resize(760, 916),
		),
	};
}

let shared: Promise<{
	fonts: Awaited<ReturnType<typeof loadFonts>>;
	assets: OgAssets;
}> | null = null;

function getShared() {
	shared ??= Promise.all([loadFonts(), loadAssets()]).then((result) => ({
		fonts: result[0],
		assets: result[1],
	}));
	return shared;
}

export async function fetchAvatar(url: string) {
	const response = await fetch(url, {
		signal: AbortSignal.timeout(AVATAR_TIMEOUT_MS),
	}).catch(() => null);
	if (!response?.ok) return null;

	const bytes = Buffer.from(await response.arrayBuffer());
	return toDataUrl(sharp(bytes).resize(128, 128)).catch(() => null);
}

export async function renderOgImage(card: OgCard) {
	const context = await getShared();
	const tree = toCardTree(card, context.assets);
	const svg = await satori(tree as Parameters<typeof satori>[0], {
		...OG_SIZE,
		fonts: context.fonts,
	});
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
