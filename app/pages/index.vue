<template>
  <Loading
    v-if="isLoading"
    text="Loading events..."
  />

  <section
    v-else-if="isError"
    class="mx-auto p-4"
  >
    <div class="rounded-xl border bg-white p-6 text-sm text-red-700">
      Failed to load events.
      <button
        type="button"
        class="ml-2 underline"
        @click="refresh"
      >
        Try again
      </button>
    </div>
  </section>

  <section
    v-else
    class="mx-auto p-4"
  >
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <h1 class="text-xl font-semibold">Events</h1>

      <EventTypeFilter v-model="selectedType" />
    </div>

 

    <div
      v-if="filteredEvents.length"
      class="flex flex-wrap gap-4"
    >
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="min-w-[300px] max-w-[300px]"
      >
        <EventCard
          :event="event"
          @select="onSelect"
          @delete="onDeleteClick"
        />
      </div>

      <ModalDeleteConfirmation
        :id="selectedEvent?.id ?? ''"
        v-model:open="showDeleteModal"
        :name="selectedEvent?.name ?? null"
        @cancel="showDeleteModal = false"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ApiEvent, EventType } from '~/types'
import { useLocalEventsStore } from '@/stores/localEvents'

const showDeleteModal = ref(false)
const selectedEvent = ref<ApiEvent | null>(null)

const store = useLocalEventsStore()
const { isLoading, isError, refresh } = useGetEventListQuery()

const selectedType = ref<'all' | EventType>('all')

const events = computed(() => store.events)

const filteredEvents = computed(() => {
  if (selectedType.value === 'all') return events.value
  return events.value.filter((e) => e.type === selectedType.value)
})

function onSelect(id: string) {
  navigateTo(`/event?id=${encodeURIComponent(id)}`)
}

function onDeleteClick(id: string) {
  const found = store.byId(id)
  selectedEvent.value = (found ?? null) as ApiEvent | null
  showDeleteModal.value = true
}
</script>
