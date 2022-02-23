import Link from '@/components/atoms/Link'

import clsx from 'clsx'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface SectionProps<DataProp = {}> {
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
    <section className='py-10'>
      <h2 className='mb-2 md:mb-4'>{title}</h2>
      <div className={clsx('grid', 'flex-auto gap-4 md:gap-5 mb-2 md:mb-4', gridCols)}>
        {data.length > 0 && data.map((data, index) => <Component key={index} {...data} />)}
      </div>
      <Link href={link.to ?? '/'}>{link.children ?? 'Go somewhere'} &rarr;</Link>
    </section>
  )
}

export default Section
