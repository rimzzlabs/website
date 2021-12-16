import type { TechincalType } from '@/types/customType'
import TechIcon from '../atoms/Icon'

const SkillCard = ({ title, Icon, description }: TechincalType) => {
  return (
    <div className='p-4 md:p-6 rounded bg-primary-low dark:bg-dark-800'>
      <div className='flex items-center space-x-2 md:space-x-3 mb-1 md:mb-2'>
        {Array.isArray(Icon) ? (
          Icon.map((type, idx) => (
            <TechIcon
              key={idx + type}
              type={type}
              className='text-[1.25em] md:text-[1.75em]'
            />
          ))
        ) : (
          <TechIcon type={Icon} />
        )}
      </div>

      <section>
        <h3>{title}</h3>
        {Array.isArray(description) ? (
          description.map((text, key) => (
            <p key={key + text.slice(0, 5)}>{text}</p>
          ))
        ) : (
          <p>{description}</p>
        )}
      </section>
    </div>
  )
}

export default SkillCard
