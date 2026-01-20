<template>
  <div class="mb-4 flex flex-wrap items-center gap-3">
    <h1 class="text-xl font-semibold">Events</h1>

    <div class="ml-auto">
      <EventTypeFilter v-model="selectedType" class="mb-4 mx-auto" />
    </div>
  </div>
  <Loading v-if="events.length === 0" text="Loading events..." />

  <section v-else class="flex flex-wrap gap-4 mx-auto p-4">
    <div
      v-for="event in filteredEvents"
      :key="event.id"
      class="min-w-[300px] max-w-[300px]"
    >
      <EventCard
        data-testid="event-card"
        :event="event"
        @select="navigateTo('/event' + `?id=${$event}`)"
        @delete="onDeleteClick(event)"
      />
    </div>
    <ModalDeleteConfirmation
      :id="selectedEvent?.id ?? ''"
      v-model:open="showDeleteModal"
      :name="selectedEvent?.name ?? null"
      @cancel="showDeleteModal = false"
    />
  </section>
</template>
<script setup lang="ts">
import type { ApiEvent, EventType } from "~/types";
import { useLocalEventsStore } from "@/stores/localEvents";

const showDeleteModal = ref(false);
const selectedEvent = ref<ApiEvent | null>(null);
const store = useLocalEventsStore();
const events = computed(() => store.events);
const selectedType = ref<"all" | EventType>("all");

function onDeleteClick(event: ApiEvent) {
  selectedEvent.value = event;
  showDeleteModal.value = true;
}

const filteredEvents = computed(() => {
  if (selectedType.value === "all") return events.value;
  return events.value.filter((e) => e.type === selectedType.value);
});
</script>
