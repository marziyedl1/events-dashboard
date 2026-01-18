import type { ApiEvent, OnSiteStatistics, OnlineStatistics } from '~/types'

type CombinedStatistics = Record<string, number | string | boolean | null | undefined>

/**
 * Fetches and normalizes statistics for an event.
 * - Online: online stats
 * - OnSite: onsite stats
 * - Hybrid: both, merged (with basic disambiguation)
 */
export function useEventStatistics(event: Ref<ApiEvent | undefined>) {
  const eventId = computed(() => String(event.value?.id ?? ''))
  const type = computed(() => event.value?.type)

  const isOnline = computed(() => type.value === 'Online')
  const isOnsite = computed(() => type.value === 'OnSite')
  const isHybrid = computed(() => type.value === 'Hybrid')

  const { data: onlineStats, isLoading: onlineLoading, isError: onlineIsError, error: onlineError, refresh: refreshOnline } =
    useGetOnlineStatsQuery(eventId, computed(() => isOnline.value || isHybrid.value))

  const { data: onsiteStats, isLoading: onsiteLoading, isError: onsiteIsError, error: onsiteError, refresh: refreshOnsite } =
    useGetOnsiteStatsQuery(eventId, computed(() => isOnsite.value || isHybrid.value))

  const loading = computed(() => onlineLoading.value || onsiteLoading.value)
  const hasAnyError = computed(() => onlineIsError.value || onsiteIsError.value)

  const combined = computed<CombinedStatistics | null>(() => {
    if (!event.value) return null

    if (isHybrid.value) {
      const on = (onlineStats.value ?? {}) as OnlineStatistics
      const os = (onsiteStats.value ?? {}) as OnSiteStatistics
      const result: CombinedStatistics = {}

      for (const [k, v] of Object.entries(on)) {
        if (k in os) result[`Online_${k}`] = v as any
        else result[k] = v as any
      }

      for (const [k, v] of Object.entries(os)) {
        if (k in on) result[`OnSite_${k}`] = v as any
        else result[k] = v as any
      }

      return result
    }

    if (isOnline.value) return (onlineStats.value as any) ?? null
    if (isOnsite.value) return (onsiteStats.value as any) ?? null

    return null
  })

  function refresh() {
    refreshOnline()
    refreshOnsite()
  }

  const errorMessage = computed(() => {
    const e = (onlineError.value || onsiteError.value) as any
    return e?.message ? String(e.message) : null
  })

  return {
    combined,
    onlineStats,
    onsiteStats,
    loading,
    hasAnyError,
    errorMessage,
    refresh,
    isOnline,
    isOnsite,
    isHybrid
  }
}
