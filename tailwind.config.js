/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("tailwindcss").Config } */
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
        theme: colors.neutral
      },
      keyframes: {
        enter: {
          '0%': { transform: 'translateY(1.75rem)', opacity: '0' },
          '50%': { transform: 'translateY(0.75rem)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', scale: '1', opacity: '1' }
        },
        leave: {
          '0%': { transform: 'translateY(0)', scale: '1', opacity: '1' },
          '50%': { transform: 'translateY(0.75rem)', opacity: '0.5' },
          '100%': { transform: 'translateY(1.75rem)', opacity: '0' }
        }
      },
      animation: {
        enter: 'enter 0.15s ease-out',
        leave: 'leave 0.15s ease-out'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
}
