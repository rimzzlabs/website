import { Variant, Variants } from 'framer-motion'

const hidden: Variant = {
  y: 25,
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
      type: 'tween'
    }
  }
})

export const withExit = (func: () => Variants): Variants => {
  const v = func()

  return {
    ...v,
    exit: {
      ...hidden,
      transition: {
        type: 'tween'
      }
    }
  }
}

export default variants
