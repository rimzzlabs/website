import { readFile, readdir } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'
import readingTime from 'reading-time'

export type GetContents<T> = T

export const getContents = async <T>(path: string): Promise<Array<GetContents<T>>> => {
  const targetDir = join(process.cwd(), path)

  const fileContents = (await readdir(targetDir)).filter((p) => /\.mdx?$/.test(p))

  const files = fileContents.map(async (fileName) => {
    const targetFile = join(targetDir, fileName)
    const file = await readFile(targetFile, 'utf8')

    const { content, data } = matter(file)
    const est_read = readingTime(content)

    return {
      ...(data as T),
      est_read: est_read,
      slug: fileName.replace('.mdx', ''),
    }
  })

  return await Promise.all(files)
}
