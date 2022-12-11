/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'prefer-const': 'warn',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-extra-semi': 'off'
  }
}
