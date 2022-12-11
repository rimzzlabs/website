import { isDev } from '@/libs/constants/environmentState'
import { twclsx } from '@/libs/twclsx'

import { useTheme } from '@/hooks'

import Giscus from '@giscus/react'
import { memo } from 'react'

export const GiscusComment = memo(() => {
  const { theme } = useTheme()

  const loadTheme = (theme = 'preferred_color_scheme') =>
    ({
      dark: 'dark',
      light: 'light',
      preferred_color_scheme: 'preferred_color_scheme'
    }[theme] ?? 'preferred_color_scheme')

  // don't load Giscus if on development mode, you can still remove this code thought
  // but that's would be a waste of internet data IMO
  if (isDev) return null

  return (
    <div className={twclsx('mt-4 md:mt-8')}>
      <Giscus
        theme={loadTheme(theme)}
        emitMetadata='0'
        inputPosition='top'
        repo='rizkimcitra/rizkicitra'
        repoId='R_kgDOGh4MEw'
        category='General'
        categoryId='DIC_kwDOGh4ME84CPxWe'
        mapping='pathname'
        reactionsEnabled='0'
        loading='lazy'
      />
    </div>
  )
})

GiscusComment.displayName = 'GiscusComment'
