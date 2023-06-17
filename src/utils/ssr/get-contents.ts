import { readFile, readdir } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'
import readingTime from 'reading-time'

export type GetContents<T> = { content: string; frontMatter: { slug: string } & T }

export const getContents = async <T>(
  folder: string,
  path: string,
): Promise<Array<GetContents<T>>> => {
  const baseFolder = join(process.cwd(), `src/${folder}`)
  const fileContents = (await readdir(`${baseFolder}/${path}`)).filter((p) => /\.mdx?$/.test(p))

  const files = fileContents.map(async (p) => {
    const dir = join(`src/${folder}/${path}`, p)
    const file = await readFile(dir, 'utf8')

    const { content, data } = matter(file)
    const est_read = readingTime(content)

    return {
      frontMatter: {
        ...(data as T),
        est_read: est_read.text,
        slug: p.replace('.mdx', ''),
      },
      content,
    }
  })

  return await Promise.all(files)
}
