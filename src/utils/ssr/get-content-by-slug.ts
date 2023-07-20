import { MDXComponents } from '@/components/mdx-components'
import type { TocList } from '@/components/table-of-contents'

import { slugify } from '@/utils/slugify'

import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { type CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import { join } from 'path'
import readingTime from 'reading-time'
import rehypePrism from 'rehype-prism-plus'

type Content<T> = {
  frontMatter: T
  content: CompileMDXResult['content']
  toc: TocList
} | null

export const getContent = async <T>(path: string): Promise<Content<T>> => {
  try {
    const slug = path.split('/').at(-1)
    const targetFile = join(process.cwd(), path + '.mdx')
    const file = await readFile(targetFile, 'utf8')

    const rehypePrismOptions = {
      showLineNumbers: true,
    }

    const { content, frontmatter } = await compileMDX<T>({
      source: file,
      options: {
        parseFrontmatter: true,
        mdxOptions: { format: 'mdx', rehypePlugins: [[rehypePrism, rehypePrismOptions]] },
      },
      components: MDXComponents,
    })

    const matterResult = matter(file)

    const headingsRegex = /^(#+)\s(.+)/gm
    const matches = Array.from(matterResult.content.matchAll(headingsRegex))
    const toc: TocList = matches.map((match) => ({
      level: match[1].length, // Determine the depth based on the number of '#' symbols
      text: match[2], // Extract the heading text
      url: slugify(match[2]), // Generate an URL-friendly ID from the heading text
    }))

    const est_read = readingTime(matterResult.content, { wordsPerMinute: 225 })

    return {
      frontMatter: { ...(frontmatter as T), slug, est_read },
      toc,
      content,
    }
  } catch (err) {
    return null
  }
}
