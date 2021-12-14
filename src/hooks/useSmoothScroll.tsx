/**
 * smooth scrol on click!
 * this custom hooks used to scoll trough targetted element smoothly
 * the function accept one parameters
 * ref: refered element that would be targetted
 * ref has value like this
 * {
 *  current: element
 * }
 * so to scroll through that element, you should acces it's <current> key inside of the object
 * if the ref valid, then return a function to scroll throught that element,
 * the function returned act like an eventListener
 */

import { RefObject } from 'react'

const useSmoothScroll = (ref: RefObject<HTMLDivElement>) => {
  if (!ref) throw new Error('a reference of element should be provided')
  const scrollToRef = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }
  return scrollToRef
}

export default useSmoothScroll
