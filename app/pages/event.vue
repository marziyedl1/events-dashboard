<template>
  <section class="flex flex-col gap-6 p-4">
    <Loading v-if="isLoading" text="Loading event..." />

    <div
      v-else-if="isError"
      class="rounded-xl border bg-white p-6 text-sm text-red-700"
    >
      Failed to load the event.
    </div>

    <section v-if="isEditMode" class="border-t pt-6 mt-6">
      <EventCard
        v-if="localEvent && isEditMode"
        :event="localEvent"
        @select="navigateTo('/event/' + `?id=${$event}`)"
        @delete="onDeleteClick()"
      />
      <h2 class="text-lg font-semibold mb-4">Statistics</h2>

      <Loading v-if="statsLoading" text="Loading statistics..." />

      <div
        v-else-if="statsError"
        class="rounded-xl border bg-white p-4 text-sm text-red-700"
      >
        Failed to load statistics.
        <button type="button" class="ml-2 underline" @click="refreshStats">
          Try again
        </button>
      </div>

      <div
        v-else-if="!statistics || Object.keys(statistics).length === 0"
        class="rounded-xl border bg-white p-4 text-sm text-gray-600"
      >
        No statistics available for this event.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(value, key) in statistics"
          :key="key"
          class="p-4 border rounded"
        >
          <p class="text-sm text-gray-500">
            {{ key }}
          </p>
          <p class="text-xl font-semibold">
            {{ value }}
          </p>
        </div>
      </div>
    </section>

    <FormEventForm
      v-if="!isLoading && !isError"
      :mode="isEditMode ? 'edit' : 'create'"
      :form-data="localEvent"
      @submit="onSubmit"
      @cancel="navigateTo('/')"
    />

    <ModalDeleteConfirmation
      :id="eventId"
      v-model:open="showDeleteModal"
      :name="localEvent?.name ?? null"
    />
  </section>
</template>

<script setup lang="ts">
import type { ApiEvent } from "~/types";
import { useLocalEventsStore } from "@/stores/localEvents";

const route = useRoute();

const eventId = computed(() => String(route.query.id ?? ""));
const isEditMode = computed(() => Boolean(eventId.value));

const {
  data: apiEvent,
  isLoading,
  isError,
} = useGetEventByIdQuery(eventId);

const store = useLocalEventsStore();

const localEvent = computed(() => {
  return apiEvent.value ?? store.byId(eventId.value);
});

const {
  combined: statistics,
  loading: statsLoading,
  hasAnyError: statsError,
  refresh: refreshStats,
} = useEventStatistics(localEvent);

const showDeleteModal = ref(false);

function onSubmit(form: ApiEvent) {
  if (isEditMode.value && localEvent.value?.id) submitEdit(form);
  else submitCreate(form);

  navigateTo("/");
}

function submitEdit(form: ApiEvent) {
  store.update(localEvent.value?.id as string, form as any);
}

function submitCreate(form: ApiEvent) {
  store.create(form as any);
}

function onDeleteClick() {
  showDeleteModal.value = true;
}
</script>
