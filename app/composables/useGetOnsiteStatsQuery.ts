import type { OnSiteStatistics } from '~/types'
import { queryKeys } from '~/configs/queryKeys'

export default function useGetOnsiteStatsQuery(
  eventId: MaybeRefOrGetter<string>,
  enabled: MaybeRefOrGetter<boolean>
) {
  const idRef = computed(() => String(unref(eventId) || ''))
  const isLocalEvent = computed(() => idRef.value.startsWith('local-'))
  const enabledRef = computed(() => Boolean(unref(enabled)) && Boolean(idRef.value) && !isLocalEvent.value)

  const key = computed(() => queryKeys.onsiteStats(idRef.value).join(':'))

  const { data, pending, error, refresh } = useAsyncData<OnSiteStatistics | null>(
    key,
    async () => {
      if (!enabledRef.value) return null
      return await $fetch<OnSiteStatistics>(`/api/onsite-statistics/${encodeURIComponent(idRef.value)}`)
    },
    {
      watch: [idRef, enabledRef],
      default: () => null,
      server:false
    }
  )

  const isLoading = computed(() => pending.value)
  const isError = computed(() => Boolean(error.value))

  return { data, isLoading, isError, error, refresh }
}
