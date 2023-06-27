import { tw } from '@/utils/tw'

import { MainLayout } from '@/layouts'

import localFont from 'next/font/local'

const FiraCode = localFont({
  src: [
    {
      style: 'normal',
      weight: '700',
      path: '../../font/fira-code/FiraCode-Bold.woff2',
    },
    {
      style: 'normal',
      weight: '600',
      path: '../../font/fira-code/FiraCode-SemiBold.woff2',
    },
    {
      style: 'normal',
      weight: '500',
      path: '../../font/fira-code/FiraCode-Medium.woff2',
    },
    {
      style: 'normal',
      weight: '400',
      path: '../../font/fira-code/FiraCode-Regular.woff2',
    },
    {
      style: 'normal',
      weight: '300',
      path: '../../font/fira-code/FiraCode-Light.woff2',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--font-fira-code',
})

const FiraCodeVF = localFont({
  src: '../../font/fira-code/FiraCode-VF.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-fira-code-vf',
})

export default function LayoutPostPage(props: React.PropsWithChildren) {
  return (
    <MainLayout className={tw(FiraCode.variable, FiraCodeVF.variable)}>{props.children}</MainLayout>
  )
}
