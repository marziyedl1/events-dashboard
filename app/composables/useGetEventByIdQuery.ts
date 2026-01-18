import { queryKeys } from '~/configs/queryKeys'
import type { ApiEvent } from '~/types'

async function fetchEventById(id: string) {
  return await $fetch<ApiEvent>(`/api/events/${encodeURIComponent(id)}`)
}

export default function useGetEventByIdQuery(id: MaybeRefOrGetter<string>) {
  const idRef = computed(() => String(unref(id) || ''))
  const isLocalEvent = computed(() => idRef.value.startsWith('local-'))
  const enabled = computed(() => !!idRef.value && !isLocalEvent.value)

  const key = computed(() => {
    const parts = queryKeys.event(idRef.value)
    return Array.isArray(parts) ? parts.join(':') : String(parts)
  })

  const { data, pending, error, refresh } = useAsyncData<ApiEvent | null>(
    key,
    async () => {
      if (!enabled.value) return null
      return await fetchEventById(idRef.value)
    },
    {
      watch: [idRef, enabled],
      immediate: enabled
    }
  )

  const isError = computed(() => Boolean(error.value))

  return { data, isLoading: pending, isError, error, refresh }
}
