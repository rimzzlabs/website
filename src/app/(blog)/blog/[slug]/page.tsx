import { DeleteCommentDialog } from '@/components/dialog/delete-comment'
import { SignInDialog } from '@/components/dialog/sign-in'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { PostContent, PostExtension, PostHeader } from '@/components/post'

import { compose } from '@/utils/common'
import { tw } from '@/utils/common'
import { createMetadata } from '@/utils/create-metadata'
import {
  BASE_URL,
  SITE_NAME,
  SITE_OWNER,
  SITE_URL,
  TWITTER_ID,
  TWITTER_USERNAME,
} from '@/utils/env/client'
import { filterPublishedPosts, getLatestPosts } from '@/utils/post'

import { allPosts } from 'contentlayer/generated'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { P, match } from 'ts-pattern'

const FiraCode = localFont({
  src: [
    {
      style: 'normal',
      weight: '700',
      path: '../../../font/fira-code/FiraCode-Bold.woff2',
    },
    {
      style: 'normal',
      weight: '600',
      path: '../../../font/fira-code/FiraCode-SemiBold.woff2',
    },
    {
      style: 'normal',
      weight: '500',
      path: '../../../font/fira-code/FiraCode-Medium.woff2',
    },
    {
      style: 'normal',
      weight: '400',
      path: '../../../font/fira-code/FiraCode-Regular.woff2',
    },
    {
      style: 'normal',
      weight: '300',
      path: '../../../font/fira-code/FiraCode-Light.woff2',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--font-fira-code',
})

const FiraCodeVF = localFont({
  src: '../../../font/fira-code/FiraCode-VF.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-fira-code-vf',
})

type PageParam = {
  params: {
    slug: string
  }
}

export default function PostPage(props: PageParam) {
  const post = filterPublishedPosts(allPosts).find((post) => post.slug === props.params.slug)

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
        <PostHeader {...post} />
        <hr className='my-4 max-w-prose' />

        <PostContent {...post} />

        <PostExtension />
      </main>

      <Footer className='lg:max-w-5xl' />

      <SignInDialog />
      <DeleteCommentDialog />
    </>
  )
}

export async function generateMetadata(context: PageParam) {
  const post = filterPublishedPosts(allPosts).find((post) => post.slug === context.params.slug)

  if (!post) {
    return createMetadata({
      templateTitle: SITE_NAME,
      title: 'Post Not Found',
      canonical: `blog/${context.params.slug}`,
    })
  }

  return match(post)
    .with(P.not(P.nullish), (post) => {
      const url = new URL('api/og', BASE_URL)
      url.searchParams.append('title', post.title)

      return createMetadata({
        title: post.title,
        description: post.description,
        templateTitle: SITE_NAME,
        canonical: `blog/${post.slug}`,
        keywords: post.keywords,
        authors: [
          {
            name: SITE_OWNER,
            url: SITE_URL,
          },
        ],
        openGraph: {
          images: url.toString(),
          type: 'article',
          title: post.title ?? "Rizki's Post",
          authors: ['Rizki Maulana Citra'],
          description:
            'Software engineer frontend. I craft fascinating and intuitive user interfaces.',
          tags: post.tags,
        },

        twitter: {
          card: 'summary_large_image',
          description:
            'Software engineer frontend. I craft fascinating and intuitive user interfaces.',
          site: SITE_URL,
          creator: TWITTER_USERNAME,
          creatorId: TWITTER_ID,
          siteId: TWITTER_ID,
          title: SITE_OWNER,
          images: url.toString(),
        },
      })
    })
    .otherwise(() => ({ title: 'You might searching for unavailable post' }))
}

export async function generateStaticParams() {
  const posts = compose(filterPublishedPosts, getLatestPosts)(allPosts)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
