/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      base: colors.zinc,
      typo: {
        head: colors.zinc[900],
        'h-dark': colors.zinc[100],
        paragraph: colors.zinc[700],
        'p-dark': colors.zinc[300],
      },
      primary: colors.blue,
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
    },
    fontFamily: {
      primary: ['var(--font-inter)', ...fontFamily.sans],
    },
    extend: {
      spacing: {
        unset: 'unset',
      },
    },
  },
  plugins: [],
}
