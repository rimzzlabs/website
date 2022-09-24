import { UnstyledButton } from '@/UI/buttons'
import { BlogCard } from '@/UI/cards'
import { CustomImage } from '@/UI/images'
import type { HeroProps } from '@/UI/templates'
import { Hero, LayoutPage } from '@/UI/templates'

import { getContents } from '@/services'

import { twclsx } from '@/libs'
import { generateOgImage, getMetaPage } from '@/libs/metapage'
import { getNewestBlog } from '@/libs/sorters'

import { useTags } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import readingTime from 'reading-time'
import type { Blog } from 'rizkicitra'

type TagsProps = {
  tags: string[]
  blogs: Blog[]
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

const meta = getMetaPage({
  title: 'Tags',
  description: 'Look for a specific blog post based on tag.',
  keywords: ['Tags', 'tag', 'tags', 'rizkicitra.dev'],
  og_image: generateOgImage({ title: 'Tags', subTitle: 'Look for a specific blog post based on tag.', theme: 'dark' }),
  og_image_alt: 'Certificate — rizkicitra.dev',
  slug: '/tags',
  type: 'website'
})

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const res = await getContents<Blog>('/blog')

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
    <LayoutPage {...meta}>
      <Hero {...(meta as HeroProps)} />

      <section className={twclsx('flex items-stretch', 'flex-wrap flex-auto gap-2 md:gap-4', 'py-10')}>
        {tags.map((t) => (
          <UnstyledButton
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
          </UnstyledButton>
        ))}
      </section>

      {selectedTags.length > 0 ? (
        <section>
          <h2 className={twclsx('mb-4')}>Showing selected tags</h2>
          <div className={twclsx('grid grid-cols-1', 'gap-4 flex-auto')}>
            {blogs
              .filter((b) => selectedTags.map((t) => b.topics.includes(t)).includes(true))
              .map((b) => (
                <BlogCard key={b.slug} {...b} />
              ))}
          </div>
        </section>
      ) : (
        <section className={twclsx('flex flex-col items-center justify-center', 'py-10')}>
          <figure className={twclsx('relative mb-2.5', 'w-40 h-40')}>
            <CustomImage display='intrinsic' src='/static/tags-illustration.svg' alt='waiting' />
          </figure>

          <p>Waiting for your command</p>
        </section>
      )}
    </LayoutPage>
  )
}

export default TagsPage
