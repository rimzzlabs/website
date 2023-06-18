import { tw } from '@/utils/tw'

export const HomeHeroTitle = () => (
  <>
    <h1 className='mt-3'>Rizki Maulana Citra</h1>
    <h2
      className={tw(
        'bg-clip-text bg-gradient-to-r',
        'text-transparent dark:text-transparent',
        'from-primary-500 to-secondary-500',
      )}
    >
      Frontend Developer
    </h2>
  </>
)
