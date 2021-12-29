import type { TechincalType } from '@/types/customType'

import clsx from 'clsx'
import dynamic from 'next/dynamic'

const TechIcon = dynamic(() => import('../atoms/Icon'))

/**
 * @description SkillCard is a component that displays a skill card, being used in the `src/pages/index.tsx`
 * @param title string, title of the skill
 * @param description string, description of the skill
 * @param icon string[] or string, this icon then would be used as type of Icon that would be used by TechIconProps,
 */
const SkillCard = ({ title, Icon, description }: TechincalType) => {
  return (
    <div className={clsx('p-3.5 md:p-6 rounded', 'border border-color transition-all duration-200')}>
      <div className='flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2'>
        {Array.isArray(Icon) ? (
          Icon.map((type, idx) => <TechIcon key={idx + type} type={type} className='text-[1.25em] md:text-[1.75em]' />)
        ) : (
          <TechIcon type={Icon} />
        )}
      </div>

      <section>
        <h3>{title}</h3>
        {Array.isArray(description) ? (
          description.map((text, key) => <p key={key + text.slice(0, 5)}>{text}</p>)
        ) : (
          <p>{description}</p>
        )}
      </section>
    </div>
  )
}

export default SkillCard
