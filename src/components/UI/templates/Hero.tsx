import { twclsx } from '@/libs/twclsx'

export type HeroProps = {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

export const Hero: React.FunctionComponent<HeroProps> = (props) => (
  <section className={twclsx('content-auto', props.className)}>
    <h1 className={twclsx('mb-2 md:mb-4')}>{props.title}</h1>
    <p>{props.description}</p>
    {props.children}
  </section>
)
