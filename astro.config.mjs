import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";

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
	integrations: [react(), sitemap({ priority: 1, changefreq: "daily", lastmod: new Date() })],

	vite: {
		plugins: [tailwindcss()],
	},
});
