/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    '^@/components(.*)$',
    '^@/pages(.*)$',
    '^@/hooks(.*)$',
    '^@/libs(.*)$',
    '^@/styles/(.*)$',
    '^@/(.*)$',
    '^[./]',
    '^',
  ],
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
