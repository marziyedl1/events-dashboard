<template>
  <section class="flex flex-wrap gap-4 mx-auto p-4">
    <div
      v-for="event in events"
      :key="event.id"
      class="min-w-[300px] max-w-[300px]"
    >
      <EventCard
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
import type { ApiEvent } from "~/types";
import { useLocalEventsStore } from "@/stores/localEvents";

const showDeleteModal = ref(false);
const selectedEvent = ref<ApiEvent | null>(null);
const store = useLocalEventsStore();
const events = computed(() => store.events);

function onDeleteClick(event: ApiEvent) {
  selectedEvent.value = event;
  showDeleteModal.value = true;
}
</script>
