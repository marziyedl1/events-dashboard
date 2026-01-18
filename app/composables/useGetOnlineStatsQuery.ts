import { useQuery } from "@tanstack/vue-query"
import { queryKeys } from "~/configs/queryKeys"
import type { OnlineStatistics } from "~/types"

export default function useGetOnlineStatsQuery(eventId: MaybeRefOrGetter<string>, enabled: MaybeRefOrGetter<boolean>) {
  const idRef = computed(() => String(unref(eventId) || ''))
      const isLocalEvent = computed(() => idRef.value.startsWith('local-'))

  const enabledRef = computed(() => !!unref(enabled) && !!idRef.value)
  const { isError, data, isLoading } =  useQuery({
    queryKey: computed(() => queryKeys.onlineStats(idRef.value)),
    queryFn: () => $fetch<OnlineStatistics>(`/api/statistics/online/${encodeURIComponent(idRef.value)}`),
    enabled: enabledRef && !isLocalEvent.value
  })
  return { isError, data, isLoading }
}