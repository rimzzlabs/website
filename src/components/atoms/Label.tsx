import clsx from 'clsx'

export type LabelProps = {
  type: string
}

const Label = ({ type }: LabelProps) => {
  let classNames
  if (type === 'devlife' || type === 'DevLife') classNames = 'bg-violet-100 text-violet-800'
  if (type === 'Next.js' || type === 'nextjs') classNames = 'bg-neutral-100 text-neutral-800'
  if (type === 'React' || type === 'Reactjs') classNames = 'bg-sky-100 text-sky-800'
  if (type === 'WebDev' || type === 'webdev') classNames = 'bg-teal-100 text-teal-800'
  if (type === 'General' || type === 'general') classNames = 'bg-neutral-100 text-neutral-800'
  if (type === 'css' || type === 'CSS') classNames = 'bg-blue-100 text-blue-700'
  return <span className={clsx('p-1 px-2 text-xs sm:text-sm select-none rounded', classNames)}>{type}</span>
}

export default Label
