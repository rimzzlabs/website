import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
	site: 'https://rimzzlabs.com',
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
