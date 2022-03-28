import Link from '@/components/atoms/Link'

import Card from '../atoms/Card'

import clsx from 'clsx'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface SectionProps<DataProp> {
  title: string
  Component: React.FC<DataProp>
  link: {
    to: string
    children: React.ReactNode
  }
  data: Array<DataProp>
  gridCols?: string
}

const Section = <DataProp,>({ title, link, data, Component, gridCols }: SectionProps<DataProp>) => {
  return (
    <section className='py-10'>
      <h2 className='mb-2 md:mb-4'>{title}</h2>
      <div className={clsx('grid', 'flex-auto gap-4 md:gap-5 mb-2 md:mb-4', gridCols)}>
        {data.length > 0 &&
          data.map((data, index) => (
            <Card key={index}>
              <Component {...data}>{null}</Component>
            </Card>
          ))}
      </div>
      <Link href={link.to ?? '/'} className='text-theme-800 dark:text-theme-200'>
        {link.children ?? 'Go somewhere'} &rarr;
      </Link>
    </section>
  )
}

export default Section
