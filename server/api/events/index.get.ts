import { fetchUpstream } from '@/server/utils/upstream'
import type { ApiEvent } from '~/types/event'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const url = `${config.public.apiBase}/api/events/`
  return await fetchUpstream<ApiEvent[]>(url)
})
