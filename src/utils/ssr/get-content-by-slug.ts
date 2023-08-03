import { MDXComponents } from '@/components/mdx-components'

import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { type CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import { join } from 'path'
import readingTime from 'reading-time'
import rehypePrism from 'rehype-prism-plus'

type Content<T> = {
  frontMatter: T
  content: CompileMDXResult['content']
}

export const getContent = async <T>(path: string) => {
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

    const est_read = readingTime(matterResult.content, { wordsPerMinute: 225 })

    const data = {
      frontMatter: { ...(frontmatter as T), slug, est_read },
      content,
    } as Content<T>

    return [data, null] as const
  } catch (err) {
    return [null, err as Error] as const
  }
}
