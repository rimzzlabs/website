import { LOCATION_DIR } from '@/services'

import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'

type GetContentBySlug<T> = { content: string; header: { slug: string } & T }

export const getContentBySlug = async <T>(path: string, slug: string): Promise<GetContentBySlug<T>> => {
  // read path to file src/data/{path}/[{slug}].mdx
  const dir = join(`${LOCATION_DIR}/${path}`, `${slug}.mdx`)
  // read file with promise based
  const file = await readFile(dir, 'utf8')

  // parse file content with gray matter, extract it's header and content
  const { content, data } = matter(file)

  return {
    header: { ...(data as T), slug },
    content
  }
}
