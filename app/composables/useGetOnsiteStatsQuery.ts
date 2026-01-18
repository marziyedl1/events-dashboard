import { queryKeys } from '~/configs/queryKeys'
import type { OnSiteStatistics } from '~/types'

async function fetchOnsiteStats(eventId: string) {
  return await $fetch<OnSiteStatistics>(
    `/api/statistics/onsite/${encodeURIComponent(eventId)}`
  )
}

export default function useGetOnsiteStatsQuery(
  eventId: MaybeRefOrGetter<string>,
  enabled: MaybeRefOrGetter<boolean>
) {
  const idRef = computed(() => String(unref(eventId) || ''))
  const isLocalEvent = computed(() => idRef.value.startsWith('local-'))

  const enabledRef = computed(
    () => Boolean(unref(enabled)) && Boolean(idRef.value) && !isLocalEvent.value
  )

  const key = computed(() => {
    const parts = queryKeys.onsiteStats(idRef.value)
    return Array.isArray(parts) ? parts.join(':') : String(parts)
  })

  const { data, pending, error, refresh } = useAsyncData<OnSiteStatistics | null>(
    key,
    async () => {
      if (!enabledRef.value) return null
      return await fetchOnsiteStats(idRef.value)
    },
    {
      watch: [idRef, enabledRef],
      immediate: enabledRef
    }
  )

  const isError = computed(() => Boolean(error.value))

  return { data, isLoading: pending, isError, error, refresh }
}
