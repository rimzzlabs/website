import { tw } from '@/utils/common'

import { P, match } from 'ts-pattern'
import { Drawer } from 'vaul'

export type TBaseDrawerProps = {
  open: boolean
  snapPoints?: Array<string | number>
  activeSnapPoint?: React.Key | null
  setActiveSnapPoint?: React.Dispatch<React.SetStateAction<TBaseDrawerProps['activeSnapPoint']>>
  className?: string
  onClose(): void
  dismissible?: boolean
  children?: React.ReactNode | ((onClose: () => void) => React.ReactNode)
}

export function BaseDrawer(args: TBaseDrawerProps) {
  const { children, className, ...props } = args

  const content = match(children)
    .with(P.instanceOf(Function), (content) => content(props.onClose))
    .with(P.not(P.nullish), (node) => node)
    .otherwise(() => null)

  return (
    <Drawer.Root
      {...props}
      fixed={false}
      shouldScaleBackground={false}
      open={props.open}
      onClose={props.onClose}
    >
      <Drawer.Overlay className='fixed z-[999999] inset-0 bg-black/90' />
      <Drawer.Portal>
        <Drawer.Content
          className={tw(
            'fixed bottom-0 left-0 right-0 z-[9999999]',
            'flex flex-col h-full',
            'bg-white dark:bg-base-800',
            className,
          )}
        >
          <div className='py-4'>
            <div className='mx-auto w-12 h-1.5 rounded-full bg-base-300 dark:bg-base-600' />
          </div>
          {content}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
