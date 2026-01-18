export interface OnlineStatistics {
  participants?: number
  watchTimeMinutes?: number
  peakConcurrentUsers?: number
  [key: string]: unknown
}

export interface OnSiteStatistics {
  attendees?: number
  checkIns?: number
  noShows?: number
  [key: string]: unknown
}