import { useInfiniteQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { FeedResponse } from '../type/feed'

export function useFeed() {
  return useInfiniteQuery<FeedResponse>({
    queryKey: ['feed'],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/feed?page=${pageParam}`)
      return res.data
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  })
}
