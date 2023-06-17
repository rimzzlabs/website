import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'

type Content<T> = {
  frontMatter: T & { slug: string }
  content: string
}

export const getContentBySlug = async <T>(path: string, slug: string): Promise<Content<T>> => {
  const folder = join(process.cwd(), 'src/contents')

  const dir = join(`${folder}/${path}`, `${slug}.mdx`)

  const file = await readFile(dir, 'utf8')
  const { content, data } = matter(file)

  return {
    frontMatter: { ...(data as T), slug },
    content,
  }
}
