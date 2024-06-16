// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],

  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: "all",
        arrowParens: "always",
        endOfLine: "auto",
        bracketSpacing: true,
      },
    },
  ],
};
