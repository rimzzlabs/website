import { tw } from '@/utils/tw'

const items = [100, 76, 79, 68, 54, 72, 89, 96]
const loadingScreen = ['rounded-md', 'bg-base-300', 'dark:bg-base-700', 'animate-pulse']

export default function LoadingPage() {
  return (
    <section className='layout lg:max-w-6xl pt-10 xs:pt-16 '>
      <h1 className='sr-only'>Loading Blog Post</h1>
      <p className='sr-only'>Crafting post for you to read, hang thight...</p>

      <div className={tw('w-full h-10', ...loadingScreen)} />
      <div className={tw('w-40 mt-4 h-10', ...loadingScreen)} />

      <div
        className={tw(
          'flex flex-col',
          'space-y-3 mt-6 mb-14',
          'sm:flex-row sm:space-y-0 sm:space-x-6',
        )}
      >
        <div className='flex space-x-2.5'>
          <div className={tw('w-7 h-6', ...loadingScreen)} />
          <div className={tw('w-40 h-6', ...loadingScreen)} />
        </div>

        <div className='flex space-x-2.5'>
          <div className={tw('w-7 h-6', ...loadingScreen)} />
          <div className={tw('w-40 h-6', ...loadingScreen)} />
        </div>
      </div>

      <div className='lg:grid lg:grid-cols-[auto,16.25rem] gap-4'>
        <div className='flex flex-col space-y-4 w-full max-w-prose'>
          {[...items, 66, 77, 90, 99, 88, 91].map((item) => (
            <div key={item} style={{ width: `${item}%` }} className={tw(`h-4`, ...loadingScreen)} />
          ))}
        </div>

        <div className='hidden w-full lg:flex lg:flex-col lg:space-y-3'>
          {items.map((item) => (
            <div
              key={item + 'toc'}
              style={{ width: `${item}%` }}
              className={tw(`h-4`, ...loadingScreen)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
