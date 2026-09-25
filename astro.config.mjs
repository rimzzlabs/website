import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { localizedErrorPages } from "./src/lib/integrations/localized-error-pages.mjs";
import { shikiCodeMeta } from "./src/lib/markdown/shiki-code-meta.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://rimzzlabs.com",
	prefetch: true,
	server: { port: 5600 },
	env: {
		schema: {
			PUBLIC_CF_TURNSTILE_SITE_KEY: envField.string({
				context: "client",
				access: "public",
				optional: true,
			}),
			CLOUDFLARE_ACCOUNT_ID: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
			CLOUDFLARE_API_TOKEN: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
		},
	},
	devToolbar: { enabled: false },
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			themes: { light: "github-light-default", dark: "github-dark-default" },
			wrap: false,
			transformers: [shikiCodeMeta()],
		},
		processor: unified({
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: "append",
						properties: {
							className: ["heading-anchor"],
							ariaHidden: "true",
							tabIndex: -1,
						},
					},
				],
			],
		}),
	},
	integrations: [
		react({
			babel: { plugins: [["babel-plugin-react-compiler", { target: "19" }]] },
		}),
		mdx(),
		localizedErrorPages(["id"]),
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: { en: "en-US", id: "id-ID" },
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Inter",
			cssVariable: "--font-inter",
			weights: ["100 900"],
			styles: ["normal"],
			subsets: ["latin"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "JetBrains Mono",
			cssVariable: "--font-jetbrains-mono",
			weights: ["100 800"],
			styles: ["normal"],
			subsets: ["latin"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Lora",
			cssVariable: "--font-lora",
			weights: ["300 900"],
			styles: ["normal"],
			subsets: ["latin"],
		},
	],
	vite: {
		plugins: [tailwindcss()],
		server: {
			proxy: {
				// Keep the browser's Host, so better-auth sees the same origin as the page.
				"/api": { target: "http://localhost:8788", changeOrigin: false },
			},
		},
	},
});
