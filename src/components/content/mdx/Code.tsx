import { twclsx } from '@/libs/twclsx'

export const Code = (props: { children: React.ReactNode }) => {
  return (
    <code
      className={twclsx(
        'py-1 px-1.5 font-normal rounded border',
        'bg-transparent',
        'border-theme-300 dark:border-theme-700'
      )}
    >
      {props.children}
    </code>
  )
}
