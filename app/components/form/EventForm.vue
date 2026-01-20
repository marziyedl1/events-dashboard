<template>
  <form
    novalidate="true"
    class="space-y-4"
    @submit.prevent="onSubmit"
  >
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
            placeholder="e.g., Aditus Summit"
          >
        </div>

        <div>
          <label class="block text-sm font-medium">Year</label>
          <input
            v-model.number="form.year"
            type="number"
            class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
          >
        </div>

        <FormBaseSelect
          v-model="form.type"
          label="Type"
          :options="['OnSite', 'Online', 'Hybrid']"
        />

        <div>
          <label class="block text-sm font-medium">Start date</label>
          <input
            v-model="form.startDate"
            type="date"
            class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
          >
        </div>

        <div>
          <label class="block text-sm font-medium">End date</label>
          <input
            v-model="form.endDate"
            type="date"
            class="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring"
          >
        </div>
      </div>

      <div
        v-if="errors.length"
        class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
      >
        <ul class="list-disc pl-5">
          <li
            v-for="(err, i) in errors"
            :key="i"
          >
            {{ err }}
          </li>
        </ul>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <button
          type="submit"
          class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {{ mode === "create" ? "Create " : "Save " }}
        </button>
        <button
          type="button"
          class="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
          @click="emit('cancel')"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { EventType, ApiEvent } from "~/types";
import { validate } from "~/utils/formValidation";

const props = defineProps<{
  mode: "create" | "edit";
  formData: ApiEvent | undefined;
}>();

const emit = defineEmits<{
  submit: [ApiEvent];
  cancel: [];
}>();

function buildForm(data?: ApiEvent): ApiEvent {
  return {
    name: data?.name || "",
    year: Number(data?.year || new Date().getFullYear()),
    startDate: toDateInput(data?.startDate) || new Date().toISOString().slice(0, 10),
    endDate: toDateInput(data?.endDate) || new Date().toISOString().slice(0, 10),
    type: (data?.type ?? "Online") as EventType,
  };
}

const form = ref<ApiEvent>(buildForm(props.formData));
watch(
  () => props.formData,
  (next) => {
    form.value = buildForm(next);
  },
  { immediate: true }
);

const errors = ref<string[]>([]);

function onSubmit() {
  const validationErrors = validate(form.value);
  errors.value = validationErrors || [];
  if (validationErrors && validationErrors.length > 0) return;

  emit("submit", { ...form.value });
}

function toDateInput(value?: string) {
  if (!value) return new Date().toISOString().slice(0, 10)
  return value.split('T')[0]
}
</script>
