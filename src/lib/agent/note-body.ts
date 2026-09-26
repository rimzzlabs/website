import type { ImageMetadata } from "astro";

import { imageMarkdown } from "@/lib/agent/images";
import { withAbsoluteLinks } from "@/lib/agent/site";

const NOTE_ASSETS = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/notes/**/*.{png,jpg,jpeg,webp}",
	{ eager: true },
);

function readImports(body: string) {
	const imports = new Map<string, ImageMetadata>();
	for (const match of body.matchAll(
		/^import (\w+) from "@\/assets\/(notes\/[^"]+)";$/gm,
	)) {
		const asset = NOTE_ASSETS[`/src/assets/${match[2]}`];
		if (asset) imports.set(match[1], asset.default);
	}
	return imports;
}

async function noteImageMarkdown(
	block: string,
	imports: Map<string, ImageMetadata>,
) {
	const caption = block.match(/caption="([^"]+)"/)?.[1];
	const images = [
		...block.matchAll(/src[=:]\s*\{?(\w+)\}?[\s\S]*?alt[=:]\s*"([^"]+)"/g),
	];
	const lines = await Promise.all(
		images.map(async (match) => {
			const image = imports.get(match[1]);
			if (!image) return `_${match[2]}_`;
			return imageMarkdown(match[2], image);
		}),
	);
	if (caption) lines.push(`_${caption}_`);
	return lines.join("\n\n");
}

export async function noteBodyMarkdown(body: string) {
	const imports = readImports(body);
	const output: Array<string> = [];
	const lines = body.split("\n");
	let fenced = false;

	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index];
		if (line.trimStart().startsWith("```")) fenced = !fenced;
		if (fenced || line.trimStart().startsWith("```")) {
			output.push(line);
			continue;
		}
		if (/^(import|export) /.test(line)) continue;

		if (line.startsWith("<NoteImage")) {
			const block = [line];
			while (
				!block.at(-1)?.trimEnd().endsWith("/>") &&
				index + 1 < lines.length
			) {
				index += 1;
				block.push(lines[index]);
			}
			output.push(await noteImageMarkdown(block.join("\n"), imports));
			continue;
		}
		if (/^<[A-Z]\w*[^>]*\/>$/.test(line.trim())) {
			output.push(
				"_This part is an interactive demo. Open the page in a browser to try it._",
			);
			continue;
		}
		output.push(line);
	}
	return withAbsoluteLinks(
		output
			.join("\n")
			.replace(/\n{3,}/g, "\n\n")
			.trim(),
	);
}
