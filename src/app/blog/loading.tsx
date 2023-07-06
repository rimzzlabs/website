import { tw } from '@/utils/tw'

import { BlogHero } from '@/features/blog'
import { MainLayout } from '@/layouts'

const loadingScreen = ['rounded-md', 'bg-base-300', 'dark:bg-base-700', 'animate-pulse']

export default function LoadingBlogPage() {
  return (
    <>
      <MainLayout className='space-y-10 md:space-y-14'>
        <BlogHero />

        <DummyList />
      </MainLayout>
    </>
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
            className={tw('w-full h-24', ...loadingScreen)}
            style={{
              animationDelay: `.${item}s`,
            }}
          />
        )
      })}
    </ul>
  )
}
