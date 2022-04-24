import Card from '@/components/atoms/Card'
import UnstyledLink from '@/components/atoms/UnstyledLink'

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
      <h2>{title}</h2>
      <div className={clsx('grid', 'flex-auto gap-4 md:gap-5 my-4', gridCols)}>
        {data.length > 0 &&
          data.map((data, index) => (
            <Card key={index}>
              <Component {...data}>{null}</Component>
            </Card>
          ))}
      </div>
      <UnstyledLink className={clsx('block')} href={link.to}>
        {link.children}
      </UnstyledLink>
    </section>
  )
}

export default Section
