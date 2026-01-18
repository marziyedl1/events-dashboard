
export const queryKeys = {
  events: ['events'] as const,
  event: (id: string) => ['event', id] as const,
  onlineStats: (id: string) => ['online-stats', id] as const,
  onsiteStats: (id: string) => ['onsite-stats', id] as const
}