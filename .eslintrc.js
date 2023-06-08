module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-semi': 'off',
    'prefer-const': 'warn',
  },
}
