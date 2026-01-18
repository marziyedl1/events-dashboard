<template>
  <section class="flex flex-col gap-6 p-4">
    <EventCard
      v-if="localEvent && isEditMode"
      :event="localEvent"
      @select="navigateTo('/event/' + `?id=${$event}`)"
      @delete="onDeleteClick()"
    />
    <Loading v-if="isLoading" />

    <section
      v-if="isEditMode && statistics"
      class="border-t pt-6 mt-6"
    >
      <h2 class="text-lg font-semibold mb-4">
        Statistics
      </h2>

      <Loading v-if="statsLoading" />

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
      v-if="!isLoading"
      :mode="isEditMode ? 'edit' : 'create'"
      :form-data="localEvent"
      @submit="onSubmit"
      @cancel="navigateTo('/')"
    />
    <ModalDeleteConfirmation
      :id="eventId"
      v-model:open="showDeleteModal"
      :name="event?.name ?? null"
    />
  </section>
</template>

<script setup lang="ts">
import type { ApiEvent } from "~/types";
import { useLocalEventsStore } from "@/stores/localEvents";

const route = useRoute();

const eventId = computed(() => route.query.id as string);
const isEditMode = computed(() => !!eventId.value);

const { data: event, isLoading } = useGetEventByIdQuery(eventId);

const store = useLocalEventsStore();

const localEvent = computed(() =>
  event.value
    ? event.value
    : store.events.find((e: any) => e.id === eventId.value),
);


const isOnline = computed(() => localEvent.value?.type === "Online");
const isOnsite = computed(() => localEvent.value?.type === "OnSite");
const isHybrid = computed(() => localEvent.value?.type === "Hybrid");

const { data: onlineStats, isLoading: onlineLoading } = useGetOnlineStatsQuery(
  eventId,
  isOnline.value || isHybrid,
);

const { data: onsiteStats, isLoading: onsiteLoading } = useGetOnsiteStatsQuery(
  eventId,
  isOnsite.value || isHybrid,
);

const statistics = computed(() => {
  if (!localEvent.value) return null;

  if (isHybrid.value) {
    return {
      ...onlineStats.value,
      ...onsiteStats.value,
    };
  }

  if (isOnline.value) return onlineStats.value;
  if (isOnsite.value) return onsiteStats.value;

  return null;
});

const statsLoading = computed(() => onlineLoading.value || onsiteLoading.value);


const showDeleteModal = ref(false);

function onDeleteClick() {
  showDeleteModal.value = true;
}

function onSubmit(form: ApiEvent) {
  if (isEditMode.value && localEvent.value?.id) {
    submitEdit(form);
  } else {
    submitCreate(form);
  }
}

function submitEdit(form: ApiEvent) {
  store.update(localEvent.value?.id as string, form as any);
  navigateTo("/");
}

function submitCreate(form: ApiEvent) {
  store.create(form as any);
  navigateTo("/");
}
</script>
