/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Inter"', ...fontFamily.sans]
      },
      colors: {
        primary: colors.blue,
        theme: colors.zinc
      }
    }
  },
  variants: {
    extend: {
      // typography: ['dark']
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
