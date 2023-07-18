/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      primary: ['var(--font-inter)', ...fontFamily.sans],
      firaCode: ['var(--font-fira-code)'],
      firaCodeVF: ['var(--font-fira-code-vf)'],
    },
    extend: {
      colors: {
        base: colors.neutral,
        typo: {
          head: colors.neutral[950],
          'h-dark': colors.white,
          paragraph: colors.neutral[900],
          'p-dark': colors.neutral[200],
        },
        primary: colors.blue,
        secondary: colors.cyan,
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
        unset: 'unset',
      },
      spacing: {
        unset: 'unset',
      },

      screens: {
        xs: '346px',
        lg: '1126px',
        '3xl': '1876px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')({ target: 'modern' })],
}
