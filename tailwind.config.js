/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      base: colors.gray,
      typo: {
        head: colors.gray[900],
        'h-dark': colors.white,
        paragraph: colors.gray[800],
        'p-dark': colors.gray[100],
      },
      primary: colors.blue,
      secondary: colors.cyan,
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
      screens: {
        '3xl': '1876px',
      },
    },
  },
  plugins: [],
}
