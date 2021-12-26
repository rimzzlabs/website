import * as B from 'react-icons/bi'
import * as I from 'react-icons/si'

export type IconType = {
  type: string
  className?: string
}

/**
 * @description custom Icon that will return an Icon component from `react-icons`
 * this component used to render the icon depends on the type of the icon
 * @param {string} type: type of the icon, this filed is required
 * @param {string} className: className of the icon, it is optional
 */
const Icon = ({ type, className = '' }: IconType) => {
  switch (type) {
    case 'markdown':
      return <I.SiMarkdown className={`text-gray-900 dark:text-gray-400 ${className}`} />
    case 'html':
      return <I.SiHtml5 className={`text-amber-500 dark:text-amber-400 ${className}`} />
    case 'css':
      return <I.SiCss3 className={`text-blue-500 dark:text-blue-400 ${className}`} />
    case 'sass':
    case 'scss':
      return <I.SiSass className={`text-pink-500 dark:text-pink-400 ${className}`} />

    case 'tailwind':
    case 'tailwindcss':
      return <I.SiTailwindcss className={`text-sky-500 dark:text-sky-400 ${className}`} />
    case 'javascript':
    case 'js':
      return <I.SiJavascript className={`text-yellow-500 dark:text-yellow-400 ${className}`} />
    case 'typescript':
    case 'ts':
      return <I.SiTypescript className={`text-blue-500 ${className}`} />
    case 'react':
      return <I.SiReact className={`text-sky-500 dark:text-sky-400 ${className}`} />
    case 'nextjs':
    case 'next':
      return <I.SiNextdotjs className={`text-gray-900 dark:text-gray-400 ${className}`} />
    case 'node':
    case 'nodejs':
    case 'node.js':
      return <I.SiNodedotjs className={`text-green-500 dark:text-green-400 ${className}`} />
    case 'express':
      return <I.SiExpress className={`text-typo-800 dark:text-typo-400 ${className}`} />
    case 'mongodb':
      return <I.SiMongodb className={`text-green-500 dark:text-green-400 ${className}`} />
    case 'graphql':
      return <I.SiGraphql className={`text-purple-500 dark:text-purple-400 ${className}`} />
    case 'firebase':
      return <I.SiFirebase className={`text-amber-500 dark:text-amber-400 ${className}`} />
    case 'git':
      return <I.SiGit className={`text-amber-500 dark:text-amber-400 ${className}`} />
    case 'github':
      return <I.SiGithub className={`text-gray-800 dark:text-gray-400 ${className}`} />

    case 'strapi':
      return <I.SiStrapi className={`text-blue-600 dark:text-blue-400 ${className}`} />
    case 'php':
      return <I.SiPhp className={`text-blue-500 dark:text-blue-400 ${className}`} />
    case 'book':
      return <B.BiBook className={className} />
    case 'tv':
      return <B.BiTv className={className} />
    case 'code':
      return <B.BiTerminal className={className} />
    case 'gamepad':
      return <B.BiJoystick className={className} />
    case 'search':
      return <B.BiSearch className={className} />
    default:
      return <I.SiHtml5 className={`text-amber-500 dark:text-amber-400 ${className}`} />
  }
}

export default Icon
