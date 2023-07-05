import { SITE_OWNER, SITE_OWNER_ROLE } from '@/domains/seo'

import { tw } from '@/utils/tw'

export const HomeHeroTitle = () => (
  <>
    <h1 className='mt-3'>{SITE_OWNER}</h1>
    <h2
      className={tw(
        'bg-clip-text bg-gradient-to-r',
        'text-transparent dark:text-transparent',
        'from-primary-500 to-secondary-500',
      )}
    >
      {SITE_OWNER_ROLE}
    </h2>
  </>
)
