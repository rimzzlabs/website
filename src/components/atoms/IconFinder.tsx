import clsx from 'clsx'
import {
  SiCodesandbox,
  SiFirebase,
  SiFramer,
  SiJavascript,
  SiMarkdown,
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite
} from 'react-icons/si'

const IconFinder: React.FC<{ type: string }> = ({ type }) => {
  const check = type.toLowerCase()
  switch (check) {
    case 'react':
      return <SiReact className={clsx('text-sky-500')} />

    case 'next.js':
    case 'nextjs':
      return <SiNextdotjs className={clsx('text-theme-800 dark:text-theme-200')} />

    case 'vite':
      return <SiVite className={clsx('text-fuchsia-500')} />

    case 'redux':
      return <SiRedux className={clsx('text-violet-500')} />

    case 'firebase':
      return <SiFirebase className={clsx('text-amber-500')} />

    case 'tailwindcss':
    case 'tailwind css':
      return <SiTailwindcss className={clsx('text-teal-500')} />

    case 'sass':
    case 'scss':
      return <SiSass className={clsx('text-pink-500 dark:text-pink-400')} />

    case 'framer motion':
      return <SiFramer className={clsx('text-theme-800 dark:text-theme-200')} />

    case 'javascript':
      return <SiJavascript className={clsx('text-yellow-500')} />

    case 'typescript':
      return <SiTypescript className={clsx('text-blue-600')} />

    case 'markdown':
      return <SiMarkdown className={clsx('text-theme-800 dark:text-theme-200')} />

    default:
      return <SiCodesandbox />
  }
}

export default IconFinder
