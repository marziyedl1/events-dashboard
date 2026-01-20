export type EventType = 'OnSite' | 'Online' | 'Hybrid'
export interface ApiEvent {
  id?: string
  name: string
  year: number
  startDate: string
  endDate: string
  type: EventType
  _isLocal?: boolean
}

export interface LocalEvent extends ApiEvent {
  // local ids are prefixed so we can distinguish them safely
  id: `local-${string}`
  _isLocal: boolean
}
