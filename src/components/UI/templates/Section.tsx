import { UnstyledLink } from '@/UI/links'

import { twclsx } from '@/libs/twclsx'

import { HiArrowNarrowRight } from 'react-icons/hi'

// eslint-disable-next-line @typescript-eslint/ban-types
export type SectionProps<DataProp> = {
  title: string
  Component: React.FunctionComponent<DataProp>
  link: {
    to: string
    children: React.ReactNode
  }
  data: Array<DataProp>
  gridCols?: string
}

export const Section = <DataProp,>({ title, link, data, Component, gridCols }: SectionProps<DataProp>) => {
  return (
    <section className={twclsx('content-auto', 'py-10')}>
      <h2>{title}</h2>
      <div className={twclsx('grid', 'gap-4 md:gap-5 my-6', 'flex-auto', gridCols)}>
        {data.length > 0 && data.map((data, index) => <Component key={index} {...data} />)}
      </div>

      <UnstyledLink
        className={twclsx(
          'group',
          'flex md:inline-flex',
          'items-center gap-2',
          'hover:text-primary-600 dark:hover:text-primary-500'
        )}
        href={link.to}
      >
        <span>{link.children}</span>
        <HiArrowNarrowRight className={twclsx('transition-transform', 'group-hover:-translate-x-1')} />
      </UnstyledLink>
    </section>
  )
}
