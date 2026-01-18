import { fetchUpstream } from '@/server/utils/upstream'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const eventId = getRouterParam(event, 'eventId')
  if (!eventId) throw createError({ statusCode: 400, statusMessage: 'Missing eventId' })
  const url = `${config.public.statsBase}/api/onsite-statistics/${encodeURIComponent(eventId)}`
  return await fetchUpstream(url)
})
