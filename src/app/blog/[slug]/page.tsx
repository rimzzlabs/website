import { getPosts } from '@/domains/post'
import { getPost } from '@/domains/post/utils/get-post'
import { SITE_NAME, SITE_OWNER, SITE_URL, createMetadata } from '@/domains/seo'

import { BlogPostHeader } from '@/features/blog'

import 'prism-themes/themes/prism-a11y-dark.css'

type PageParam = {
  params: {
    slug: string
  }
}

export async function generateMetadata(param: PageParam) {
  const post = await getPost(param.params.slug)

  return createMetadata({
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    templateTitle: SITE_NAME,
    keywords: post.frontMatter.keywords,
    canonical: SITE_URL + '/blog/' + post.frontMatter.slug,
    creator: SITE_OWNER,
    openGraph: {
      images: `https://ik.imagekit.io/mlnzyx/attachment/tr:w-720,h-720,f-auto/rizkimcitra.webp`,
      type: 'article',
      title: post.frontMatter.title,
    },
  })
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage(param: PageParam) {
  const post = await getPost(param.params.slug)

  return (
    <article>
      <BlogPostHeader {...post.frontMatter} />

      <section className='prose dark:prose-invert'>{post.content}</section>
    </article>
  )
}
