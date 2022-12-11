import { toLowerCase } from '@/libs/string'
import { twclsx } from '@/libs/twclsx'

type LabelProps = {
  type: string
  className?: string
  onClick?: () => void | (() => Promise<void>)
}

export const LabelBlog: React.FunctionComponent<LabelProps> = (props) => {
  const baseClass = 'inline-flex items-center justify-center py-1 px-1.5 rounded text-xs md:text-sm font-medium'
  const type = toLowerCase(props.type)

  switch (type) {
    case 'devlife':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'react':
      return (
        <span
          className={twclsx(baseClass, 'text-sky-700 bg-sky-100 dark:text-sky-100 dark:bg-sky-900', props.className)}
        >
          {props.type}
        </span>
      )

    case 'nextjs':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'git':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-amber-700 bg-amber-100 dark:text-amber-100 dark:bg-amber-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'frontend':
    case 'css':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-cyan-700 bg-cyan-100 dark:text-cyan-100 dark:bg-cyan-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'webdev':
    case 'web dev':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-fuchsia-700 bg-fuchsia-100 dark:text-fuchsia-100 dark:bg-fuchsia-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'web analytics':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-emerald-700 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'hooks':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'state management':
      return (
        <span
          className={twclsx(baseClass, 'text-rose-700 bg-rose-100 dark:text-rose-50 dark:bg-rose-800', props.className)}
        >
          {props.type}
        </span>
      )
    case 'baas':
      return (
        <span
          className={twclsx(
            baseClass,
            'bg-purple-100 text-purple-700 dark:bg-purple-500 dark:text-purple-50',
            props.className
          )}
        >
          {props.type}
        </span>
      )
    case 'supabase':
      return (
        <span
          className={twclsx(
            baseClass,
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-500 dark:text-black',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'ux':
    case 'user experience':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-orange-700 dark:text-orange-200 bg-orange-100 dark:bg-orange-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    case 'accessibility':
      return (
        <span
          className={twclsx(
            baseClass,
            'text-violet-700 dark:text-violet-200 bg-violet-100 dark:bg-violet-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )

    default:
      return (
        <span
          className={twclsx(
            baseClass,
            'text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800',
            props.className
          )}
        >
          {props.type}
        </span>
      )
  }
}
