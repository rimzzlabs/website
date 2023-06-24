import { HomeHeroDescription } from './hh-description'
import { HomeHeroImage } from './hh-image'
import { HomeHeroSocialMedia } from './hh-social-media'
import { HomeHeroTitle } from './hh-title'

export const HomeHero = () => {
  return (
    <section className='flex flex-col'>
      <div className='relative flex h-14 md:h-16'>
        <HomeHeroImage />
        <HomeHeroSocialMedia className='ml-auto max-w-max' />
      </div>

      <HomeHeroTitle />

      <HomeHeroDescription />
    </section>
  )
}
