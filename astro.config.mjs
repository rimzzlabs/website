import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
	site: "https://rimzzlabs.com",
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Rubik",
			cssVariable: "--font-sans",
			display: "swap",
			formats: ["woff2", "woff"],
		},
	],
	env: {
		schema: {
			PUBLIC_CF_TURNSTILE_SITE_KEY: envField.string({
				context: "client",
				access: "public",
			}),
		},
	},
	devToolbar: { enabled: false },
	i18n: {
		locales: ["en", "id"],
		defaultLocale: "en",
		routing: { prefixDefaultLocale: false },
	},
	// Authorize the thesvg.org CDN so its remote brand icons can be used with the
	// <Image /> component. https://docs.astro.build/en/guides/images/#authorizing-remote-images
	// These are SVGs, so use the no-op service to pass them through as-is rather
	// than rasterizing them through Sharp (which would blur the vector icons).
	image: {
		domains: ["thesvg.org"],
	},
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			themes: { light: "github-light", dark: "vitesse-dark" },
			wrap: true,
		},
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
	},
	integrations: [
		react(),
		mdx(),
		sitemap({
			priority: 1,
			changefreq: "daily",
			lastmod: new Date(),
			i18n: { defaultLocale: "en", locales: { en: "en", id: "id" } },
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
