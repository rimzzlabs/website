import { Variant, Variants } from 'framer-motion'

const hidden: Variant = {
  y: 15,
  opacity: 0
}

const visible: Variant = {
  y: 0,
  opacity: 1
}

const variants = (): Variants => ({
  hidden,
  visible: {
    ...visible,
    transition: {
      type: 'tween',
      duration: 0.15
    }
  }
})

export const withExit = (func: () => Variants): Variants => {
  const v = func()

  return {
    ...v,
    exit: {
      y: 0,
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0.25
      }
    }
  }
}

export default variants
