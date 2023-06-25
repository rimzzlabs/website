import { tw } from '@/utils/tw'

export const BlogHero = () => {
  return (
    <section
      className={tw(
        'pt-10 xs:pt-16 md:pt-24 pb-10',
        '[&>p]:text-lg [&>p]:max-w-prose [&>p]:first-of-type:mb-2',
      )}
    >
      <h1 className='title mb-4'>Blog</h1>
      <p>
        Welcome to my personal blog, this page is a place where I share my life events, experiences,
        knowledge, and ideas on a variety of topics.
      </p>
      <p>
        To be honest, most of the articles I write are technical, but I&apos;ll do my best to come
        up with interesting reads for you; feel free to explore them as you browse through.
      </p>
    </section>
  )
}
