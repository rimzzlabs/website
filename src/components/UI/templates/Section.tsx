import { Loading } from '@/components/mollecules/Loading'

import { UnstyledLink } from '@/UI/links'
import { twclsx } from '@/libs/twclsx'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'

const Card = dynamic(() => import('@/components/atoms/Card'), { suspense: true })

// eslint-disable-next-line @typescript-eslint/ban-types
export interface SectionProps<DataProp> {
  title: string
  Component: React.FunctionComponent<DataProp>
  link: {
    to: string
    children: React.ReactNode
  }
  data: Array<DataProp>
  gridCols?: string
}

const Section = <DataProp,>({ title, link, data, Component, gridCols }: SectionProps<DataProp>) => {
  return (
    <section className={twclsx('content-auto', 'py-10')}>
      <h2>{title}</h2>
      <Suspense fallback={<Loading containerSize='full' spinnerSize='sm' containerStyle='h-72' />}>
        <div className={twclsx('grid', 'gap-4 md:gap-5 my-6', 'flex-auto', gridCols)}>
          {data.length > 0 &&
            data.map((data, index) => (
              <Card key={index}>
                <Component {...data}>{null}</Component>
              </Card>
            ))}
        </div>
      </Suspense>

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

export default Section
