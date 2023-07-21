import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { getPosts } from '@/domains/post'
import { getPost } from '@/domains/post'
import { OG, SITE_NAME, SITE_OWNER, SITE_URL, createMetadata } from '@/domains/seo'

import { tw } from '@/utils/tw'

import { PostContent } from './post-content'
import { PostHeader } from './post-header'

import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import 'prism-themes/themes/prism-a11y-dark.css'
import { P, match } from 'ts-pattern'

const FiraCode = localFont({
  src: [
    {
      style: 'normal',
      weight: '700',
      path: '../../font/fira-code/FiraCode-Bold.woff2',
    },
    {
      style: 'normal',
      weight: '600',
      path: '../../font/fira-code/FiraCode-SemiBold.woff2',
    },
    {
      style: 'normal',
      weight: '500',
      path: '../../font/fira-code/FiraCode-Medium.woff2',
    },
    {
      style: 'normal',
      weight: '400',
      path: '../../font/fira-code/FiraCode-Regular.woff2',
    },
    {
      style: 'normal',
      weight: '300',
      path: '../../font/fira-code/FiraCode-Light.woff2',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--font-fira-code',
})

const FiraCodeVF = localFont({
  src: '../../font/fira-code/FiraCode-VF.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-fira-code-vf',
})

type PageParam = {
  params: {
    slug: string
  }
}

export const revalidate = 30

export default async function PostPage(props: PageParam) {
  const post = await getPost(props.params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header className='lg:max-w-5xl' />
      <main
        id='skip-content'
        className={tw('layout lg:max-w-5xl', FiraCode.variable, FiraCodeVF.variable)}
      >
        <PostHeader {...post.frontMatter} views={post.views} />

        <hr className='my-4 max-w-prose' />

        <PostContent frontMatter={post.frontMatter} toc={post.toc}>
          {post.content}
        </PostContent>
      </main>

      <Footer className='lg:max-w-5xl' />
    </>
  )
}

export async function generateMetadata(param: PageParam) {
  const post = await getPost(param.params.slug)

  return match(post)
    .with(P.not(P.nullish), (post) =>
      createMetadata({
        title: post.frontMatter.title,
        description: post.frontMatter.description,
        templateTitle: SITE_NAME,
        keywords: post.frontMatter.keywords,
        authors: [
          {
            name: SITE_OWNER,
            url: SITE_URL,
          },
        ],
        openGraph: {
          images: OG.dynamic,
          type: 'article',
          title: post.frontMatter.title ?? "Rizki's Post",
        },
      }),
    )
    .otherwise(() => ({ title: 'You might searching for unavailable post' }))
}

export async function generateStaticParams() {
  const posts = await getPosts()

  if (!posts) return []

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
