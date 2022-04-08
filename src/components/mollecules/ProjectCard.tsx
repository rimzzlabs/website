import Link from '@/components/atoms/Link'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'

import IconFinder from '../atoms/IconFinder'

import clsx from 'clsx'

const ProjectCard = ({ title, summary, slug, stack }: PortfolioHeadProps) => {
  return (
    <div className={clsx('relative flex flex-col h-full', 'p-3 bg-theme-50 dark:bg-theme-900')}>
      <h3>{title}</h3>
      <p className={'my-3 md:my-4'}>{summary}</p>
      <div className={clsx('flex items-center mt-auto space-x-1 md:space-x-2')}>
        {stack.length > 0 && stack.map((item, index) => <IconFinder type={item} key={item + index} />)}
      </div>

      <Link href={`/portfolio/${slug}`} className={clsx('absolute inset-0 rounded')}>
        <span className='sr-only'>Read Article about project {title}</span>
      </Link>
    </div>
  )
}

export default ProjectCard
