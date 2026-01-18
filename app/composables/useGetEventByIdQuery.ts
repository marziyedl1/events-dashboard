import { queryKeys } from "~/configs/queryKeys";
import type { ApiEvent } from "~/types";
import { useQuery } from '@tanstack/vue-query'

export default function useGetEventByIdQuery(id: MaybeRefOrGetter<string>) {
    const idRef = computed(() => String(unref(id) || ''))
    const isLocalEvent = computed(() => idRef.value.startsWith('local-'))

    const { isError, data, isLoading } = useQuery({
        queryKey: queryKeys.event(idRef.value),
        queryFn: () => $fetch<ApiEvent>(`/events/${encodeURIComponent(idRef.value)}`),
        enabled: computed(() => !!idRef.value && !isLocalEvent.value)
    })
    return { isError, data, isLoading }
}
