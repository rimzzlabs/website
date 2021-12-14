import { NextSeo } from 'next-seo'

type PageMetaProps = {
  title: string
  description: string
  image: string
  url: string
}

const PageMeta = ({ title, description, image, url }: PageMetaProps) => {
  return (
    <NextSeo
      title={title}
      titleTemplate={`%s - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
      description={description}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: image,
            width: 800,
            height: 600,
            alt: ''
          }
        ],
        site_name: process.env.NEXT_PUBLIC_SITE_NAME
      }}
      twitter={{
        handle: '@nextjs',
        cardType: 'summary_large_image'
      }}
    />
  )
}

export default PageMeta
