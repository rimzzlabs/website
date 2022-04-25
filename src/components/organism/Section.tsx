import Card from '@/components/atoms/Card'
import UnstyledLink from '@/components/atoms/UnstyledLink'

import { twclsx } from '@/libs/twclsx'

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
    <section className={twclsx('py-10')}>
      <h2>{title}</h2>
      <div className={twclsx('grid', 'gap-4 md:gap-5 my-6', 'flex-auto', gridCols)}>
        {data.length > 0 &&
          data.map((data, index) => (
            <Card key={index}>
              <Component {...data}>{null}</Component>
            </Card>
          ))}
      </div>
      <UnstyledLink
        className={twclsx('block md:inline-flex', 'hover:text-primary-600 dark:hover:text-primary-500')}
        href={link.to}
      >
        {link.children} &rarr;
      </UnstyledLink>
    </section>
  )
}

export default Section
