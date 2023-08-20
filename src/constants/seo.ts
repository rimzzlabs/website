import { SITE_OWNER } from '@/utils/env/client'

import buildUrl from 'cloudinary-build-url'
import type { Metadata } from 'next'

export const KEYWORDS = {
  home: [
    SITE_OWNER,
    'rizki',
    'rizki citra',
    'rizki m citra',
    'rizki maulana citra',
    'software engineer',
    'frontend development',
    'slicing website',
    'blog',
    'tech',
    'reactjs',
    'nextjs',
    'personal website',
  ],
}

export const AUTHORS: Metadata['authors'] = [
  { name: 'Rizki Maulana Citra', url: 'https://rizkicitra.dev' },
]

export const OG = {
  static: buildUrl('rizkicitra.dev/og/og.png', {
    cloud: {
      cloudName: 'rizkicitra',
    },
  }),
  dynamic: buildUrl('rizkicitra.dev/og/dynamic.png', {
    cloud: {
      cloudName: 'rizkicitra',
    },
    transformations: {
      resize: {
        height: 1080,
        width: 1920,
      },
    },
  }),
}
