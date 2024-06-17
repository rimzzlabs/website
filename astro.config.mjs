import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rimzzlabs.com",
  integrations: [
    tailwind(),
    react(),
    mdx({
      syntaxHighlight: "shiki",
      optimize: true,
    }),
    sitemap({
      priority: 0.7,
      changefreq: "weekly",
      lastmod: new Date(),
      serialize(item) {
        if (item.url === "https://rimzzlabs.com/") {
          item.priority = 1;
        }
        if (/\/blog\/([^/]+)/.test(item.url)) {
          item.priority = 0.9;
        }
        return item;
      },
    }),
  ],
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["res.cloudinary.com"],
  },
  output: "hybrid",
  adapter: vercel(),
});
