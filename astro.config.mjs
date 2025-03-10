import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rimzzlabs.com",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: { theme: "vitesse-dark", wrap: true },
  },
  integrations: [
    tailwind(),
    react(),
    mdx(),
    sitemap({
      priority: 1,
      changefreq: "daily",
      lastmod: new Date(),
    }),
  ],
  output: "static",
  adapter: vercel(),
  server: { host: true },
});
