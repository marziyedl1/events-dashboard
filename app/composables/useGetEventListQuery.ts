import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '~/configs/queryKeys'

export function useGetEventListQuery() {

  const { isError, data, isLoading } = useQuery({
    queryFn: async () => {
      const data = await $fetch('/api/events/')
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    queryKey: queryKeys.events
  })
  return { isError, data, isLoading }
}
