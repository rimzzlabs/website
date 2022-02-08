import clsx from 'clsx'

export interface HeroProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

const Hero: React.FC<HeroProps> = ({ title, description, ...props }) => (
  <section className={clsx(props.className)}>
    <h1 className='mb-2 md:mb-4'>{title}</h1>
    <p>{description}</p>
    {props.children ?? null}
  </section>
)

export default Hero
