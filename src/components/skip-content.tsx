import { tw } from '@/utils/common'

export const SkipContent = () => {
  return (
    <a
      href='#skip-content'
      title='Skip to content'
      className={tw(
        'absolute left-10 top-4',
        'inline-flex items-center justify-center',
        'py-2 px-4 rounded text-sm z-[999999]',
        '-translate-y-96 focus-visible:-translate-y-0',
        'bg-primary-600 text-white dark:bg-base-800',
      )}
    >
      Skip to main content
    </a>
  )
}
