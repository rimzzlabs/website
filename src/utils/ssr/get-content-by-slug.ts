import { MDXComponents } from '@/components/mdx-components'

import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { type CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import { join } from 'path'
import readingTime from 'reading-time'

type Content<T> = {
  frontMatter: T
  content: CompileMDXResult['content']
} | null

export const getContent = async <T>(path: string): Promise<Content<T>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mdxPrism = require('mdx-prism')

    const slug = path.split('/')[0]
    const targetFile = join(process.cwd(), path + '.mdx')
    const file = await readFile(targetFile, 'utf8')

    const matterResult = matter(file)

    const { content, frontmatter } = await compileMDX<T>({
      source: file,
      options: { parseFrontmatter: true, mdxOptions: { format: 'mdx', rehypePlugins: [mdxPrism] } },
      components: MDXComponents,
    })

    const est_read = readingTime(matterResult.content, { wordsPerMinute: 225 })

    return {
      frontMatter: { ...(frontmatter as T), slug, est_read },
      content,
    }
  } catch (err) {
    return null
  }
}
