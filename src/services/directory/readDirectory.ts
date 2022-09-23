import { LOCATION_DIR } from './location'

import { readdir } from 'fs/promises'

/**
 * It reads the contents of a directory and returns an array of strings that are the names of the files
 * in that directory
 * @param {string} path - required path to reads, example: `/blog` this will reads all `.mdx` files inside `src/data/blog`
 * @returns An array of strings.
 */
export const readDirectory = async (path: string): Promise<Array<string>> => {
  /**
   * 1. read files inside directory given
   * 2. filter the files, exclude all files that doesn't ends with extension .mdx
   * 3. return list of file names
   */
  return (await readdir(`${LOCATION_DIR}/${path}`)).filter((p) => /\.mdx?$/.test(p))
}
