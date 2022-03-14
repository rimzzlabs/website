/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Inter"', ...fontFamily.sans]
      },
      colors: {
        primary: colors.blue,
        ternary: colors.teal,
        theme: colors.zinc
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
}
