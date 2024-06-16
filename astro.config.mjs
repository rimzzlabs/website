import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

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
