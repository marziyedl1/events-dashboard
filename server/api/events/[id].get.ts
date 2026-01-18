import { fetchUpstream } from '@/server/utils/upstream'
import type { ApiEvent } from '~/types/event'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing id' })
  const url = `${config.public.apiBase}/api/events/${encodeURIComponent(id)}`
  return await fetchUpstream<ApiEvent>(url)
})
