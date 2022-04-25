import IconFinder from '@/components/atoms/IconFinder'
import UnstyledLink from '@/components/atoms/UnstyledLink'

import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'
import { twclsx } from '@/libs/twclsx'

const ProjectCard = ({ title, summary, slug, stack }: PortfolioHeadProps) => {
  return (
    <div className={twclsx('relative flex flex-col h-full', 'p-3 bg-theme-50 dark:bg-theme-900')}>
      <h3>{title}</h3>
      <p className={twclsx('my-3 md:my-4')}>{summary}</p>
      <div className={twclsx('flex items-center mt-auto space-x-1 md:space-x-2')}>
        {stack.length > 0 && stack.map((item, index) => <IconFinder type={item} key={item + index} />)}
      </div>

      <UnstyledLink title={title} href={`/portfolio/${slug}`} className={twclsx('absolute inset-0 rounded')}>
        <span className={twclsx('sr-only')}>Read Article about project {title}</span>
      </UnstyledLink>
    </div>
  )
}

export default ProjectCard
