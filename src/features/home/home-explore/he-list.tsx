export type HomeExploreItem = {
  title: string
  description: string
  hrefTitle: string
  href: '/blog' | '/portfolio' | '/guestbook'
}

const exploreList: HomeExploreItem[] = [
  {
    title: 'Read my post',
    description:
      'My personal blog is a place where I share my experiences, knowledge, my hobbies, and ideas on a variety of topics.',
    hrefTitle: 'Read Blogs',
    href: '/blog',
  },
  {
    title: 'Explore my portfolio',
    description:
      "I've been cooking up some seriously awesome projects for you to explore. Feel free to dive in and discover the incredible things I've created.",
    hrefTitle: 'Explore Portfolios',
    href: '/portfolio',
  },
  {
    title: 'Sign my guestbook',
    description:
      'Make a note of your visit. Help spread the word by telling your friends about your visit here.',
    hrefTitle: 'Sign',
    href: '/guestbook',
  },
]

export const HomeExploreList = () => {
  return (
    <div className='flex flex-col space-y-3 mt-4'>
      {exploreList.map((item) => {
        return (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p className='mt-2.5 mb-3'>{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}
