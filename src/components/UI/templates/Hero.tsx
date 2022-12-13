import { twclsx } from '@/libs/twclsx'

export type HeroProps = {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

export const Hero: React.FunctionComponent<HeroProps> = (props) => (
  <section className={twclsx('content-auto pb-8 md:pb-16', props.className)}>
    <h1 className='mb-3 md:mb-4'>{props.title}</h1>
    <p>{props.description}</p>
    {props.children}
  </section>
)
