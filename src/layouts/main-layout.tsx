import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { tw } from '@/utils/tw'

type P = {
  className?: string
  noHeader?: boolean
}

export const MainLayout = (props: React.PropsWithChildren<P>) => {
  return (
    <>
      {!props.noHeader && <Header />}
      <main className={tw('layout mb-8', props.className)} id='skip-content'>
        {props.children}
      </main>

      <Footer />
    </>
  )
}
