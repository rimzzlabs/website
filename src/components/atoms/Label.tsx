import clsx from 'clsx'

interface LabelProps {
  type: string
  onClick?: () => void | (() => Promise<void>)
}

const Label: React.FC<LabelProps> = (props) => {
  const baseClass = 'inline-flex items-center justify-center py-1 px-1.5 rounded text-xs md:text-sm'
  switch (props.type) {
    case 'devlife':
      return (
        <div className={clsx(baseClass, 'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800')}>
          {props.type}
        </div>
      )

    case 'react':
      return (
        <div className={clsx(baseClass, 'text-sky-700 bg-sky-100 dark:text-sky-100 dark:bg-sky-900')}>{props.type}</div>
      )

    case 'nextjs':
      return (
        <div className={clsx(baseClass, 'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700')}>
          {props.type}
        </div>
      )

    case 'git':
      return (
        <div className={clsx(baseClass, 'text-amber-700 bg-amber-100 dark:text-amber-100 dark:bg-amber-800')}>
          {props.type}
        </div>
      )

    default:
      return (
        <div className={clsx(baseClass, 'text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800')}>
          {props.type}
        </div>
      )
  }
}

export default Label
