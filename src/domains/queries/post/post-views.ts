import { getPostViewsQuery } from './handler'
import { QUERY_KEY_POST_VIEWS } from './query-key'

import { useQuery } from '@tanstack/react-query'

type usePageViewsParams = {
  initialData: number
  slug: string
}

export const usePageViews = (params: usePageViewsParams) => {
  return useQuery({
    queryKey: [QUERY_KEY_POST_VIEWS, params.slug],
    queryFn: getPostViewsQuery(params.slug),
    initialData: params.initialData,
  })
}
