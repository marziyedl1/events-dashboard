import { queryKeys } from '~/configs/queryKeys'
import type { ApiEvent } from '~/types'

export default function useGetEventByIdQuery(id: MaybeRefOrGetter<string>) {
  const idRef = computed(() => String(unref(id) || ''))
  const isLocalEvent = computed(() => idRef.value.startsWith('local-'))

  const key = computed(() => queryKeys.event(idRef.value).join(':'))

  const { data, pending, error, refresh } = useAsyncData<ApiEvent | null>(
    key,
    async () => {
      if (!idRef.value || isLocalEvent.value) return null
      return await $fetch<ApiEvent>(`/events/${encodeURIComponent(idRef.value)}`)
    },
    {
      watch: [idRef],
      default: () => null,
      server:false
    }
  )

  const isLoading = computed(() => pending.value)
  const isError = computed(() => Boolean(error.value))

  return { data, isLoading, isError, error, refresh }
}
