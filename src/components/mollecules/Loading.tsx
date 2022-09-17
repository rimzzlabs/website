import { twclsx } from '@/libs/twclsx'

import { ImSpinner2 } from 'react-icons/im'

const spinnerSize = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const containerSize = {
  fit: 'w-fit h-fit',
  full: 'w-full h-full',
  fullScreen: 'fixed inset-0 z-50'
}

type LoadingProps = {
  spinnerSize: keyof typeof spinnerSize
  containerSize: keyof typeof containerSize
  containerStyle?: string
}
export const Loading: React.FunctionComponent<LoadingProps> = (props) => {
  return (
    <div
      className={twclsx(
        'flex items-center justify-center',
        'bg-theme-50 dark:bg-theme-900',
        containerSize[props.containerSize],
        props.containerStyle
      )}
    >
      <ImSpinner2 className={twclsx('animate-spin text-blue-600 dark:text-blue-500', spinnerSize[props.spinnerSize])} />
    </div>
  )
}
