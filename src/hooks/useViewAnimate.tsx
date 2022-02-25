import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * a custom hook to animate element, when in a viewport
 * @example
 * ```tsx
 * import useViewAnimate from '@/hooks/useViewAnimate'
 * import variants from '@/libs/animation/variants'
 *
 * export default function App(){
 *      const v = variants()
 *      const { ref, controls } = useViewAnimate()
 *
 *      return (
 *          <motion.div
 *          ref={ref}
 *          variants={v}
 *          initial="hidden"
 *          animate={controls}
 *          >
 *          <h1 className="title">Hello World!</h1>
 *          </div>
 *      )
 * }
 * ```
 */
const useViewAnimate = () => {
  const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: '100px 0px'
    }),
    controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')

    if (!inView) controls.start('')
  }, [inView, controls])

  return { ref, controls }
}

export default useViewAnimate
