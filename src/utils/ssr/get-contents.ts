import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import readingTime from 'reading-time'

export const getContents = async <T = unknown>(path: string) => {
  try {
    const targetDir = join(process.cwd(), path)

    const fileContents = await fs.readdir(targetDir)
    const mdxFiles = fileContents.filter(
      (fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'),
    )

    const files = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const targetFile = join(targetDir, fileName)
        const file = await fs.readFile(targetFile, 'utf8')

        const { content, data } = matter(file)
        const est_read = readingTime(content)

        return {
          ...(data as T),
          est_read,
          slug: fileName.replace('.mdx', '').replace('.md', ''),
        }
      }),
    )

    return [files as T[], null] as const
  } catch (e) {
    return [null, e as Error] as const
  }
}
