import { rename, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ERROR_PAGES = ["404", "500"];

/**
 * Cloudflare Pages serves the nearest `404.html` up the path, so `/id/*`
 * misses need `dist/id/404.html`. Astro builds nested error pages as
 * `id/404/index.html`, so move them into place after the build.
 * @param {ReadonlyArray<string>} locales
 * @returns {import("astro").AstroIntegration}
 */
export function localizedErrorPages(locales) {
	return {
		name: "rimzzlabs:localized-error-pages",
		hooks: {
			"astro:build:done": async ({ dir }) => {
				const root = fileURLToPath(dir);
				for (const locale of locales) {
					for (const page of ERROR_PAGES) {
						const folder = `${root}${locale}/${page}`;
						await rename(`${folder}/index.html`, `${folder}.html`);
						await rm(folder, { recursive: true });
					}
				}
			},
		},
	};
}
