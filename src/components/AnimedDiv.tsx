/**
 * Animated div used to animate the children when in viewport of the screen
 */
import useAnimateView from '@/hooks/useAnimateView'
import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'

type AnimeDivProps = {
  children: React.ReactNode
  className?: string
}

const AnimeDiv = ({ children, className = '' }: AnimeDivProps) => {
  const { ref, controls } = useAnimateView()
  const variants: Variants = {
    hidden: { opacity: 0, y: 75 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween', delay: 0.45, duration: 0.25 }
    }
  }
  return (
    <m.div
      initial='hidden'
      ref={ref}
      variants={variants}
      animate={controls}
      className={className}>
      {children}
    </m.div>
  )
}

export default AnimeDiv
