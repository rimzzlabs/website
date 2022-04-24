import fs from 'fs/promises'
import path from 'path'

export const DATA_DIR = path.join(process.cwd(), 'src/data')

export const getDirectory = async (path: string): Promise<Array<string>> => {
  return (await fs.readdir(`${DATA_DIR}/${path}`)).filter((p) => /\.mdx?$/.test(p))
}
