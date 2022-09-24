import { useTheme } from '@/hooks'
import { isDev } from '@/libs/constants/environmentState'
import { twclsx } from '@/libs/twclsx'

import Giscus from '@giscus/react'
import { memo } from 'react'

const GiscusComment = () => {
  const { systemTheme } = useTheme()

  if (isDev) return null

  return (
    <figure className={twclsx('mt-4 md:mt-8')}>
      <Giscus
        theme={systemTheme ?? 'dark'}
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
    </figure>
  )
}

export default memo(GiscusComment)
