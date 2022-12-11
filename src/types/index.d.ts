declare module 'rizkicitra' {
  /** Type used for blog post or meta data for blog */
  export type Blog = {
    title: string
    slug: string
    summary: string
    featured: boolean
    author_name: string
    github_username: string
    published: string
    topics: Array<string>
    keywords: Array<string>
    related: Array<string>
    views?: number
    est_read?: string
    displayViews?: boolean
  }
  /** Type used for portfolio or meta data for portfolio */
  export type Portfolio = {
    title: string
    date: string
    featured: boolean
    summary: string
    slug: string
    stack: Array<string>
    image: string
    link: {
      github: string
      live: string
    }
  }
  /** Type used for snippet or meta data for snippet */
  export type Snippet = {
    title: string
    summary: string
    topic: string
    created_at: string
    slug: string
    author: string
    github_username: string
  }
  /** Payload for utils to generate og image, return value will be a string from https://og-image.vercel.app */
  export type genOgImagePayload = {
    title: string
    subTitle?: string
    theme?: 'light' | 'dark'
  }

  // a section for resume - start
  /** An education type used for list of education data later on displayed on resume page */
  export type Education = {
    school: string
    period: { start: string; end: string }
    paragraphs: string[]
    list?: {
      title: string
      listItem: string[]
    }
  }

  /** a type used for list of experiences data later on displayed on resume page */
  export type Experience = {
    companyName: string
    role: string
    period: {
      start: string
      end: string
    }
    lists: string[]
  }
  // a section for resume - end

  /** a type used for social like facebook, provide text to displayed to view and an for the URL*/
  export type Social = {
    title: string
    href: string
  }

  /** a type used for list of certificate later on certificate page */
  export type Certificate = { title: string; src: string }

  /** a type for pageView from umami */
  export type PageView = {
    bounces: { value: number; change: number }
    pageviews: { value: number; change: number }
    totaltime: { value: number; change: number }
    unique: { value: number; change: number }
  }

  export type Timeline = {
    title: string
    description: string
    place: string
    start_date: Date
    end_date: Date | null
    type: 'edu' | 'work'
  }

  export type PageViewResponse = {
    message: string
    view: number | null
  }
}
