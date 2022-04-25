import { twclsx } from '@/libs/twclsx'

interface CardProps {
  children: React.ReactNode
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <section
      className={twclsx(
        'relative p-0.5 transition-transform',
        'active:scale-[0.98]',
        'bg-black dark:bg-transparent',
        'dark:bg-gradient-to-br dark:from-primary-500 dark:to-ternary-500',
        'before:absolute before:-z-[1] before:inset-0 before:transition-transform',
        'before:bg-black dark:before:bg-gradient-to-br before:from-primary-500 before:to-ternary-500',
        'hover:before:translate-x-2 hover:before:translate-y-2',
        'active:before:translate-x-1 active:before:translate-y-1'
      )}
    >
      {props.children}
    </section>
  )
}

export default Card
