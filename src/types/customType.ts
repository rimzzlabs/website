type MetaStrapiType = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

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

export type ProjectType = {
  data: Array<SingleProjectType>
  meta: MetaStrapiType
}

// function type
/**
 * Async Arrow Function Promise that return an oject of data
 * {
 * isError: boolean
 * data: projectType
 * }
 */
export type HTTPGetType = (path: string) => Promise<{
  isError: boolean
  data: ProjectType
}>
