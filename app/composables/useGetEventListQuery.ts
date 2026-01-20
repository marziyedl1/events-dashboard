import type { ApiEvent } from '~/types'
import { queryKeys } from '~/configs/queryKeys'

export function useGetEventListQuery() {
  const key = queryKeys.events.join(':')

  const { data, pending, error, refresh } = useAsyncData<ApiEvent[]>(
    key,
    () => $fetch<ApiEvent[]>('/events/'),
    {
      default: () => [],
      server:false
    }
  )

  const isLoading = computed(() => pending.value)
  const isError = computed(() => Boolean(error.value))

  return { data, isLoading, isError, error, refresh }
}
