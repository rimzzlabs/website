import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import BlogCard from '@/components/mollecules/BlogCard'
import Hero, { HeroProps } from '@/components/mollecules/Hero'
import Layout from '@/components/templates/Layout'

import { Blogs } from '@/data/blog/blog.type'
import { getBlog } from '@/helpers/getBlog'
import useTags from '@/hooks/useTags'
import { getMetaData } from '@/libs/metaData'
import { getNewestBlog } from '@/libs/sortBlog'
import { twclsx } from '@/libs/twclsx'

import { GetStaticProps, NextPage } from 'next'
import readingTime from 'reading-time'

type TagsProps = {
  tags: string[]
  blogs: Blogs[]
}

type OptionColors = Partial<{
  [x: string]: string
}>

const getClassName = (str: string) => {
  const optionColors: OptionColors = {
    devlife: 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800',
    react: 'text-sky-700 bg-sky-100 dark:text-sky-100 dark:bg-sky-900',
    nextjs: 'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700',
    git: 'text-amber-700 bg-amber-100 dark:text-amber-100 dark:bg-amber-800',
    frontend: 'text-cyan-700 bg-cyan-100 dark:text-cyan-100 dark:bg-cyan-800',
    webdev: 'text-fuchsia-700 bg-fuchsia-100 dark:text-fuchsia-100 dark:bg-fuchsia-800',
    hooks: 'text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-800',
    'web analytics': 'text-emerald-700 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-800'
  }

  const defaultColor = 'text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800'

  return optionColors[str] || defaultColor
}

const meta = getMetaData({
  title: 'Tags',
  description: 'Look for a specific blog post based on tag.',
  keywords: ['Tags', 'tag', 'tags', 'rizkicitra.dev'],
  og_image:
    'https://og-image.vercel.app/**Tags%20%E2%80%94%20Rizki%20M%20Citra**%3Cbr%20%2F%3ELook%20for%20a%20specific%20blog%20post%20based%20on%20tag.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-bw-logo.svg',
  og_image_alt: 'Certificate — Rizki M Citra',
  slug: '/tags',
  type: 'website'
})

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const res = await getBlog()

  const blogs = res.map((b) => ({ ...b.header, est_read: readingTime(b.content).text })).sort(getNewestBlog)

  const tags = res
    .map((blog) => blog.header.topics)
    .flat()
    .filter((tag, index, tags) => tags.indexOf(tag) === index)

  return {
    props: {
      tags,
      blogs
    }
  }
}

const TagsPage: NextPage<TagsProps> = ({ tags, blogs }) => {
  const { selectedTags, setNewTag } = useTags()

  return (
    <Layout {...meta}>
      <Hero {...(meta as HeroProps)} />

      <section className={twclsx('flex items-stretch', 'flex-wrap flex-auto gap-4', 'py-10')}>
        {tags.map((t) => (
          <Button
            onClick={() => setNewTag(t)}
            className={twclsx(
              'py-2 px-4 rounded',
              !selectedTags.includes(t) && 'motion-safe:active:scale-95 motion-safe:hover:scale-110',
              !selectedTags.includes(t) && selectedTags.length > 0
                ? 'bg-theme-500 text-white dark:bg-theme-200 dark:text-theme-900'
                : getClassName(t)
            )}
            key={t}
          >
            {t}
          </Button>
        ))}
      </section>

      {selectedTags.length > 0 ? (
        <section>
          <h2 className={twclsx('mb-4')}>Showing selected tags</h2>
          <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
            {blogs
              .filter((b) => selectedTags.map((t) => b.topics.includes(t)).includes(true))
              .map((b) => (
                <Card key={b.slug}>
                  <BlogCard {...b} />
                </Card>
              ))}
          </div>
        </section>
      ) : null}
    </Layout>
  )
}

export default TagsPage
