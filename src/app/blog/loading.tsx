import { tw } from '@/utils/tw'

import { BlogHero } from '@/features/blog'
import { MainLayout } from '@/layouts'

export default function LoadingBlogPage() {
  return (
    <MainLayout className='space-y-10 md:space-y-14'>
      <BlogHero />

      <DummyList />
    </MainLayout>
  )
}

function DummyList() {
  const list = [1, 2, 3, 4]

  return (
    <ul className='flex flex-col space-y-6'>
      {list.map((item) => {
        return (
          <li
            key={`loading-blog-list-${item}`}
            className={tw(
              'w-full h-24',
              'bg-gradient-to-r',
              'from-base-200 to-base-600',
              'dark:from-base-800 to-base-950',
              'animate-pulse',
            )}
            style={{
              animationDelay: `.${item}s`,
            }}
          />
        )
      })}
    </ul>
  )
}
