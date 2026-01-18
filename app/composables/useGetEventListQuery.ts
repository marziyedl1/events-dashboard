import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from '~/configs/queryKeys'
import { useLocalEventsStore } from '@/stores/localEvents';

export function useGetEventListQuery() {
  const store = useLocalEventsStore()

  return useQuery({
    enabled: process.client,
    queryFn: async () => {
      const data = await $fetch('/api/events/')
      store.init(data)
      return data
    },
    staleTime: 0,
    queryKey: queryKeys.events
  })
}
