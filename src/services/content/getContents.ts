import { LOCATION_DIR, readDirectory } from '@/services'

import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'

type GetContents<T> = { content: string; header: { slug: string } & T }

export const getContents = async <T>(path: string): Promise<Array<GetContents<T>>> => {
  // read files inside src/data/blog
  const paths = await readDirectory('/blog')

  // map files and returns as a Promise
  const files = paths.map(async (p) => {
    // write the path file like: `src/data/blog
    const dir = join(`${LOCATION_DIR}/${path}`, p)
    // then read the file with fs promise, format will be utf8
    const file = await readFile(dir, 'utf8')

    // parse the file with matter and convert it from markdown
    // extract the content, and the headers(data)
    const { content, data } = matter(file)

    return {
      header: {
        ...(data as T),
        slug: p.replace('.mdx', '')
      },
      content
    }
  })

  return await Promise.all(files)
}
