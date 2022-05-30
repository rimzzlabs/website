import { twclsx } from '@/libs/twclsx'

interface LabelProps {
  type: string
  onClick?: () => void | (() => Promise<void>)
}

const Label: React.FunctionComponent<LabelProps> = (props) => {
  const baseClass = 'inline-flex items-center justify-center py-1 px-1.5 rounded text-xs md:text-sm'
  const type = props.type.toLowerCase()
  switch (type) {
    case 'devlife':
      return (
        <div className={twclsx(baseClass, 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800')}>
          {props.type}
        </div>
      )

    case 'react':
      return (
        <div className={twclsx(baseClass, 'text-sky-700 bg-sky-100 dark:text-sky-100 dark:bg-sky-900')}>
          {props.type}
        </div>
      )

    case 'nextjs':
      return (
        <div className={twclsx(baseClass, 'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700')}>
          {props.type}
        </div>
      )

    case 'git':
      return (
        <div className={twclsx(baseClass, 'text-amber-700 bg-amber-100 dark:text-amber-100 dark:bg-amber-800')}>
          {props.type}
        </div>
      )

    case 'frontend':
      return (
        <div className={twclsx(baseClass, 'text-cyan-700 bg-cyan-100 dark:text-cyan-100 dark:bg-cyan-800')}>
          {props.type}
        </div>
      )

    case 'webdev':
      return (
        <div className={twclsx(baseClass, 'text-fuchsia-700 bg-fuchsia-100 dark:text-fuchsia-100 dark:bg-fuchsia-800')}>
          {props.type}
        </div>
      )

    case 'web analytics':
      return (
        <div className={twclsx(baseClass, 'text-emerald-700 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-800')}>
          {props.type}
        </div>
      )

    case 'hooks':
      return (
        <div className={twclsx(baseClass, 'text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-800')}>
          {props.type}
        </div>
      )

    default:
      return (
        <div className={twclsx(baseClass, 'text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800')}>
          {props.type}
        </div>
      )
  }
}

export default Label
