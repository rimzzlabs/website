const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    '^@/components(.*)$',
    '^@/UI(.*)$',
    '^@/services(.*)$',
    '^@/libs(.*)$',
    '^@/(.*)$',
    '^[./]',
    '^',
    '^@/styles/(.*)$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}

module.exports = config
