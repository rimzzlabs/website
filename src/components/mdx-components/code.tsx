import { tw } from '@/utils/common'

type TProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
export const Code = (props: TProps) => {
  return (
    <code
      {...props}
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
