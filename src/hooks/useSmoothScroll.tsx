import { confType } from '@/types/customType'

import { RefObject } from 'react'

/**
 * smooth scrol on click!
 * this custom hooks used to scoll trough targetted element smoothly
 * the function accept one parameters
 * ref: refered element that would be targetted
 * @example
 * // ref has value like this
 * ref = {current: element }
 *
 * @description
 * so to scroll through that element, you should acces it's `current` key inside of the object
 * if the ref valid, then return a function to scroll throught that element,
 * the function returned act like an eventListener
 */
const useSmoothScroll = (ref: RefObject<HTMLDivElement>, opt = {} as confType) => {
  if (!ref) throw new Error('a reference of element should be provided')
  const scrollToRef = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: opt.block ?? 'center',
        inline: opt.inline ?? 'center'
      })
    }
  }
  return scrollToRef
}

export default useSmoothScroll
