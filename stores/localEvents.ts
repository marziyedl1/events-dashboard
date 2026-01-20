import { defineStore } from 'pinia'
import type { ApiEvent, LocalEvent } from '~/types/event'

const STORAGE_KEY = 'aditus:local-events:v1'

function makeId() {
  const uuid = globalThis.crypto?.randomUUID?.()
  return `local-${uuid ?? Math.random().toString(16).slice(2)}`
}

function loadFromStorage(): LocalEvent[] {
  if (typeof globalThis !== 'undefined' && !globalThis.window) return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useLocalEventsStore = defineStore('localEvents', {
  state: () => ({
    events: [] as (LocalEvent | (ApiEvent))[],
    initialized: false
  }),

  getters: {
    byId: (state) => (id: string) =>
      state.events.find((e: LocalEvent | (ApiEvent)) => e.id === id)
  },

  actions: {
    init(apiEvents: ApiEvent[]) {
      const stored = loadFromStorage()

      if (stored.length) {
        this.events = stored
      }
      else {
        this.events = apiEvents.map(e => ({
          id: e.id as string,
          _isLocal: false,
          ...e
        }))
      }

      if (!this.initialized) {
        if (typeof globalThis !== 'undefined' && globalThis.window) {
          this.$subscribe((_, state) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.events))
          })
        }
        this.initialized = true
      }
    },

    create(input: ApiEvent) {
      this.events.unshift({
        id: makeId() as `local-${string}`,
        _isLocal: true,
        ...input
      } as LocalEvent)
    },

    update(id: string, patch: Partial<ApiEvent>) {
      const idx = this.events.findIndex((e: LocalEvent | (ApiEvent)) => e.id === id)
      if (idx === -1) return

      this.events[idx] = {
        ...this.events[idx],
        ...patch
      }
    },

    remove(id: string) {
      this.events = this.events.filter((e: LocalEvent | (ApiEvent)) => e.id !== id)
    }
  }
})
