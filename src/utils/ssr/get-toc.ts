import type { TocList } from '@/components/table-of-contents'

import { slugify } from '../slugify'

import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'

export const getTableOfContents = async (filePath: string) => {
  try {
    const path = join(process.cwd(), filePath)

    const file = await readFile(path, 'utf8')
    const content = matter(file)

    const headingsRegex = /^(#+)\s(.+)/gm
    const matches = Array.from(content.content.matchAll(headingsRegex))
    const toc: TocList = matches.map((match) => ({
      level: match[1].length, // Determine the depth based on the number of '#' symbols
      text: match[2], // Extract the heading text
      url: slugify(match[2]), // Generate an URL-friendly ID from the heading text
    }))

    return [toc, null] as const
  } catch (error) {
    return [null, error as Error] as const
  }
}
