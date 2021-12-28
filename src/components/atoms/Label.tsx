import clsx from 'clsx'

export type LabelProps = {
  type: string
}

const Label = ({ type }: LabelProps) => {
  let classNames
  switch (type) {
    case 'Next.js':
    case 'Nextjs':
    case 'nextjs':
    case 'General':
    case 'general':
      classNames = 'text-neutral-800 bg-neutral-100'
      break

    case 'frontend':
    case 'css':
    case 'typescript':
      classNames = 'text-cyan-800 bg-cyan-100'
      break

    case 'javascript':
    case 'Javascript':
    case 'JavaScript':
      classNames = 'text-yellow-800 bg-yellow-100'
      break

    case 'devlife':
    case 'DevLife':
      classNames = 'text-violet-800 bg-violet-100'
      break

    case 'React':
    case 'Reactjs':
    case 'React.js':
      classNames = 'text-sky-800 bg-sky-100'
      break

    case 'WebDev':
    case 'webdev':
      classNames = 'text-blue-800 bg-blue-100'
      break

    default:
      classNames = 'text-slate-800 bg-slate-100'
      break
  }

  return <span className={clsx('p-1 px-2 text-xs sm:text-sm select-none rounded', classNames)}>{type}</span>
}

export default Label
