import { Variants } from 'framer-motion'

type createAnimationProps = (
  hasExit?: boolean,
  delay?: number | 0,
  duration?: number | 0.25
) => Variants

export const createAnimation: createAnimationProps = (
  hasExit = false,
  delay = 0,
  duration = 0.25
) => {
  const animation = {
    hidden: {
      opacity: 0,
      y: 50
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeInOut',
        duration,
        delay
      }
    }
  }
  const exitAnimation = {
    opacity: 0,
    y: 100,
    transition: {
      ease: 'easeInOut',
      duration
    }
  }
  if (hasExit) {
    return { ...animation, exit: exitAnimation }
  }
  return animation
}

export const pageTransition = createAnimation(true, 0, 0.5)

export const sectionTransition = createAnimation(false, 0.25, 0.4)

export const navbarTransition = createAnimation(true, 0, 0.25)

export const staggerTransition: Variants = {
  hidden: { opacity: 0.9 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: 'easeInOut', duration: 0.25 }
  }
}
