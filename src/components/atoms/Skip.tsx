import { twclsx } from '@/libs/twclsx'

const Skip: React.FunctionComponent = () => {
  return (
    <a
      className={twclsx(
        'accessible',
        'absolute left-[20%] top-4',
        'inline-flex items-center justify-center',
        'py-2 px-4 rounded text-sm',
        'bg-gradient-to-r z-[999]',
        '-translate-y-96 focus-visible:-translate-y-0',
        'text-white from-primary-500 to-ternary-500'
      )}
      href='#skip-content'
    >
      Skip to content
    </a>
  )
}

export default Skip
