import { queryKeys } from '~/configs/queryKeys'
import type { OnlineStatistics } from '~/types'

async function fetchOnlineStats(eventId: string) {
  return await $fetch<OnlineStatistics>(
    `/api/statistics/online/${encodeURIComponent(eventId)}`
  )
}

export default function useGetOnlineStatsQuery(
  eventId: MaybeRefOrGetter<string>,
  enabled: MaybeRefOrGetter<boolean>
) {
  const idRef = computed(() => String(unref(eventId) || ''))
  const isLocalEvent = computed(() => idRef.value.startsWith('local-'))

  const enabledRef = computed(
    () => Boolean(unref(enabled)) && Boolean(idRef.value) && !isLocalEvent.value
  )

  const key = computed(() => {
    const parts = queryKeys.onlineStats(idRef.value)
    return Array.isArray(parts) ? parts.join(':') : String(parts)
  })

  const { data, pending, error, refresh } = useAsyncData<OnlineStatistics | null>(
    key,
    async () => {
      if (!enabledRef.value) return null
      return await fetchOnlineStats(idRef.value)
    },
    {
      watch: [idRef, enabledRef],
      immediate: enabledRef
    }
  )

  const isError = computed(() => Boolean(error.value))

  return { data, isLoading: pending, isError, error, refresh }
}
