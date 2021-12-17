/**
 * @description the `MetaStrapiType` is new for me, so I have no idea what this data used for,
 * but I thought this would be used for pagination
 */
export type MetaStrapiType = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

/**
 * @description regular type used for a component that only accepts 2 props
 * @example
 * ```ts
 * const Component = ({children, className = ''}) => <Component className={className} />
 * ```
 */
export type RegularComponent = {
  children: React.ReactNode
  className?: string
}

/**
 * @description this type refer to a Projects, which then will be used by a Component named `ProjectCard.tsx` in `src/components/cards/ProjectCard.tsx` and in `src/pages/index.tsx` for props
 * @todo please note this can be customize with your own **content-type** in strapi be sure to check which components that using this type
 */
export type SingleProjectType = {
  id: number
  attributes: {
    title: string
    description: string
    slug: string
    url: {
      image: string
      github: string
      preview: string
    }
    featured: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

/**
 * @description this simply used for data fetching, as if you make a HTTP Request to your strapi app, you would get an object of data like this
 */
export type ProjectType = {
  data: Array<SingleProjectType>
  meta: MetaStrapiType
}

/**
 * @description techincal type are being used on `src/utils/constant.ts`, used to define what type of data are in there
 */
export type TechincalType = {
  title: string
  Icon: Array<string> | string
  description: Array<string> | string
}

/**
 * @description a type that refer to meta props, this would be used by component <Meta> on `src/components/atoms/Meta.tsx`
 */
export type MetaType = {
  title: string
  description: string
  imageURL?: string
  imageALT?: string
  url?: string
}

/**
 * @description NextLinkProps would be used by `<NextLink />` component, see the component at `src/components/NextLink.tsx`
 * it is an object that contains href, children, _these two are required_, classsName, passHref, prefetch, and unstyled
 */
export type NextLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  passHref?: boolean
  prefetch?: boolean
  unstyled?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

/**
 * @description TogglerProps will be used by Toggler componetn on `src/components/Toggler.tsx`, thsi type will refer to the props that Toggler component will accept
 */
export type TogglerProps = {
  children: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

/**
 * @description AnimeConainerType refer to a component that will be used by `src/components/atoms/AnimeContainer.tsx`
 */
export type AnimeContainerProps = {
  children: React.ReactNode
  stagger?: boolean
  list?: boolean
  className?: string
  delay?: number
}

/**
 * @description this type refer to a component that will be used by `src/components/NextImage.tsx`
 * usd to dipsplay an optimized Image component
 */
export type NextImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  layoutFill?: boolean
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

/**
 * @description HoobbyCardProps refer to the props of the HobbyCard component in `src/components/cards` contains the following props:
 * @param icon an icon to be used in the card
 * @param title string, title of the skill
 */
export type HobbyCardProps = {
  icon: string
  title: string
}

// function type

/**
 * @description HTTPGetType is simply a function type that would be used by a module in `src/libs/doFetch.ts` for data fetching purpose
 */
export type HTTPGetType = (path: string) => Promise<{
  isError: boolean
  result: ProjectType
}>
