import useAnimateView from '@/hooks/useAnimateView'
import type { AnimeContainerProps } from '@/types/customType'

import { Variants, m } from 'framer-motion'
import * as React from 'react'

/**
 * @description AnimeContainer simply wraps the children with a wrapper that you want to animate when entering a viewpoert
 * @param children React Node, this component is just simple wrapper, you should wrap your component inside this component
 * @param stagger boolean, if you want to stagger animation, set this to true default `false`
 * @param list boolean, if you want this wrapper to be an <ul> element, set this to true default are false
 * @param className string, className of the wrapper if you want to add any class default are empty string
 * @param delay number, delay of the animation default are `0.25s`
 * @returns JSX.Element
 */
const AnimeContainer = ({
  children,
  stagger = false,
  list = false,
  delay = 0.25,
  className = ''
}: AnimeContainerProps) => {
  const { ref, controls } = useAnimateView()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.45,
        delay: stagger ? 0 : delay,
        staggerChildren: stagger ? 0.25 : 0
      }
    }
  }

  if (list) {
    return (
      <m.ul initial='hidden' ref={ref} animate={controls} variants={variants} className={className}>
        {children}
      </m.ul>
    )
  }

  return (
    <m.div initial='hidden' ref={ref} animate={controls} variants={variants} className={className}>
      {children}
    </m.div>
  )
}

export default AnimeContainer
