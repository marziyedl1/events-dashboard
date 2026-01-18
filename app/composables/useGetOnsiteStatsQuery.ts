import { useQuery } from "@tanstack/vue-query"
import { queryKeys } from "~/configs/queryKeys"
import type { OnSiteStatistics } from "~/types"

export default function useGetOnsiteStatsQuery(eventId: MaybeRefOrGetter<string>, enabled: MaybeRefOrGetter<boolean>) {
  const idRef = computed(() => String(unref(eventId) || ''))
  const enabledRef = computed(() => !!unref(enabled) && !!idRef.value)
  const isLocalEvent = computed(() => idRef.value.startsWith('local-'))

  const { isError, data, isLoading } = useQuery({
    queryKey: computed(() => queryKeys.onsiteStats(idRef.value)),
    queryFn: () => $fetch<OnSiteStatistics>(`/api/statistics/onsite/${encodeURIComponent(idRef.value)}`),
    enabled: enabledRef && !isLocalEvent.value
  })
  return { isError, data, isLoading }
}