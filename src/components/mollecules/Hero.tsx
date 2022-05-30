import { twclsx } from '@/libs/twclsx'

export interface HeroProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

const Hero: React.FunctionComponent<HeroProps> = ({ title, description, ...props }) => (
  <section className={twclsx('content-auto', props.className)}>
    <h1 className={twclsx('mb-2 md:mb-4')}>{title}</h1>
    <p>{description}</p>
    {props.children}
  </section>
)

export default Hero
