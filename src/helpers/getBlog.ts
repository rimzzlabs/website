import { Blogs } from '@/data/blog/blog.type'

import { DATA_DIR, getDirectory } from './getDirectory'

import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

export interface GetBlogReturnValue {
  header: Blogs
  content: string
}

export const getBlogBySlug = async (slug: string): Promise<GetBlogReturnValue> => {
  // read folder
  const dir = path.join(`${DATA_DIR}/blog`, `${slug}.mdx`)
  // read file with promise based
  const file = await fs.readFile(dir, 'utf8')

  // parse file content with gray matter, extract it's frontmatter and contents
  const { content, data } = matter(file)

  return {
    header: { ...(data as Blogs), slug },
    content
  }
}

export const getBlog = async (): Promise<Array<GetBlogReturnValue>> => {
  const paths = await getDirectory('/blog')

  const files = paths.map(async (p) => {
    const dir = path.join(`${DATA_DIR}/blog`, p)
    const file = await fs.readFile(dir, 'utf8')

    const { content, data } = matter(file)

    return {
      header: {
        ...(data as Blogs),
        slug: p.replace('.mdx', '')
      },
      content
    }
  })

  return await Promise.all(files)
}
