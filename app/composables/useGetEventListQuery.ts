import { queryKeys } from '~/configs/queryKeys'
import type { ApiEvent } from '~/types'

async function fetchEvents() {
  return await $fetch<ApiEvent[]>('/api/events/')
}

export function useGetEventListQuery() {
  const key = Array.isArray(queryKeys.events)
    ? queryKeys.events.join(':')
    : String(queryKeys.events)

  const { data, pending, error, refresh } = useAsyncData<ApiEvent[]>(key, fetchEvents)

  const isError = computed(() => Boolean(error.value))

  return { data, isLoading: pending, isError, error, refresh }
}
