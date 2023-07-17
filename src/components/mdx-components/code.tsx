import { tw } from '@/utils/tw'

export const Code = (props: React.PropsWithChildren) => {
  return (
    <code
      className={tw(
        'border rounded text-sm p-1',
        'before:hidden after:hidden bg-base-100 dark:bg-base-800',
        'border-base-300 dark:border-base-700',
      )}
    >
      {props.children}
    </code>
  )
}
