const config = {
  // run type check on typescript file
  '**/*.ts?(x)': () => 'yarn type-check',
  //   run eslint on change to javascript / typescript files
  '**/*.(ts|js)?(x)': (filenames) => `yarn lint . ${filenames.join(' ')}`
}

module.exports = config
