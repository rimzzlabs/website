import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    mdx({
      syntaxHighlight: "shiki",
      remarkPlugins: [remarkReadingTime],
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
function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage, {
      wordsPerMinute: 238,
    });
    data.astro.frontmatter.readingTime = {
      text: readingTime.text,
      words: readingTime.words,
    };
  };
}
