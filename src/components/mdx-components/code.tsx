import { tw } from '@/utils/tw'

export const Code = (props: React.PropsWithChildren) => {
  return (
    <code
      className={tw(
        'border rounded text-sm p-1',
        'before:hidden after:hidden',
        'border-base-300 dark:border-base-600',
      )}
    >
      {props.children}
    </code>
  )
}
