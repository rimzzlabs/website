import fs from 'fs'
import path from 'path'

export const ARTICLE_PATH = path.join(process.cwd(), 'src/data')

/**
 * It returns an array of all the files in the directory.
 * @param {string} path - The path to the directory `required`.
 * @returns An array of strings.
 */
const getFullPath = (path: string): Array<string> => {
  return fs.readdirSync(`${ARTICLE_PATH}/${path}`).filter((p) => /\.mdx?$/.test(p))
}

export default getFullPath
