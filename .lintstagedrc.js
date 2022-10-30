const path = require('path')

const runScript =
  (command = 'next lint --fix') =>
  (filenames) =>
    `--file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [runScript(), runScript('prettier --w')],
  '*.{md,mdx,css}': [runScript('prettier --w')]
}
