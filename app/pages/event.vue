<template>
  <section class="flex flex-col gap-6 p-4">
    <EventCard
      v-if="localEvent && isEditMode"
      :event="localEvent"
      @select="navigateTo('/event/' + `?id=${$event}`)"
      @delete="onDeleteClick()"
    />
    <div
      v-else-if="isLoading"
      class="text-center"
    >
      Loading...
    </div>

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
import useGetEventByIdQuery from "../composables/useGetEventByIdQuery";
import { useLocalEventsStore } from "@/stores/localEvents";

const route = useRoute();
const eventId = computed(() => route.query.id as string);
const isEditMode = computed(() => !!route.query.id);
const { data: event, isLoading } = useGetEventByIdQuery(eventId);
const store = useLocalEventsStore();
const localEvent = computed(() => event.value ? event.value : store.events.find((e: any) => e.id === eventId.value));


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
