import { BlogList, LabelBlog } from '@/components/content'

import { UnstyledButton } from '@/UI/buttons'
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
  const filteredBlogs = blogs.filter((b) => selectedTags.map((t) => b.topics.includes(t)).includes(true))

  return (
    <LayoutPage {...meta}>
      <Hero {...(meta as HeroProps)} />

      <section className={twclsx('flex items-stretch', 'flex-wrap flex-auto gap-2 md:gap-4', 'py-10')}>
        {tags.map((t) => (
          <UnstyledButton onClick={setNewTag(t)} key={t}>
            <LabelBlog
              type={t}
              className={twclsx(
                'py-2 px-4 rounded',
                !selectedTags.includes(t) && 'motion-safe:active:scale-95 motion-safe:hover:scale-110',
                !selectedTags.includes(t) &&
                  selectedTags.length > 0 &&
                  'bg-theme-500 text-white dark:bg-theme-200 dark:text-theme-900'
              )}
            />
          </UnstyledButton>
        ))}
      </section>

      {selectedTags.length > 0 ? (
        <BlogList
          description="Based on the selected tags, I've found some possible results for your."
          posts={filteredBlogs}
          title='Showing Selected Tags'
        />
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
