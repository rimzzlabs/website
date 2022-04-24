import IconFinder from '@/components/atoms/IconFinder'
import UnstyledLink from '@/components/atoms/UnstyledLink'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'

import clsx from 'clsx'

const ProjectCard = ({ title, summary, slug, stack }: PortfolioHeadProps) => {
  return (
    <div className={clsx('relative flex flex-col h-full', 'p-3 bg-theme-50 dark:bg-theme-900')}>
      <h3>{title}</h3>
      <p className={'my-3 md:my-4'}>{summary}</p>
      <div className={clsx('flex items-center mt-auto space-x-1 md:space-x-2')}>
        {stack.length > 0 && stack.map((item, index) => <IconFinder type={item} key={item + index} />)}
      </div>

      <UnstyledLink href={`/portfolio/${slug}`} className={clsx('absolute inset-0 rounded')}>
        <span className='sr-only'>Read Article about project {title}</span>
      </UnstyledLink>
    </div>
  )
}

export default ProjectCard
