import { defineConfig, envField } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
	site: 'https://rimzzlabs.com',
	env: {
		schema: {
			PUBLIC_CF_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
			PUBLIC_EMAILJS_KEY: envField.string({ context: 'client', access: 'public' }),
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: { theme: 'vitesse-dark', wrap: true },
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
	},
	integrations: [
		mdx(),
		sitemap({ priority: 1, changefreq: 'daily', lastmod: new Date() }),
		react(),
	],
})
