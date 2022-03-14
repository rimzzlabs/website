import clsx from 'clsx'
import {
  SiCodesandbox,
  SiFirebase,
  SiJavascript,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiVite
} from 'react-icons/si'

const IconFinder: React.FC<{ type: string; className?: string }> = ({ type, className }) => {
  switch (type) {
    case 'React':
      return <SiReact className={clsx('text-sky-500', className)} />

    case 'Vite':
      return <SiVite className={clsx('text-fuchsia-500', className)} />

    case 'Redux':
      return <SiRedux className={clsx('text-violet-500', className)} />

    case 'Firebase':
      return <SiFirebase className={clsx('text-amber-500', className)} />

    case 'Tailwindcss':
    case 'TailwindCSS':
      return <SiTailwindcss className={clsx('text-teal-500', className)} />

    case 'SASS':
    case 'Sass':
    case 'SCSS':
    case 'Scss':
      return <SiSass className={clsx('text-pink-500 dark:text-pink-400', className)} />

    case 'Javascript':
    case 'javascript':
      return <SiJavascript className={clsx('text-yellow-500', className)} />

    default:
      return <SiCodesandbox />
  }
}

export default IconFinder
