<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    @click.self="close"
  >
    <div class="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
      <h3 class="text-lg font-semibold text-gray-900 text-center">
        Delete Confirmation
      </h3>

      <p class="mt-2 text-sm text-gray-600">
        Are you sure you want to delete
        <span class="font-medium text-gray-900">“{{ name }}”</span>?
        This action cannot be undone.
      </p>

      <div class="mt-5 flex justify-end gap-2">
        <button
          class="rounded-lg px-4 py-2 text-sm hover:bg-gray-100"
          @click="close"
        >
          Cancel
        </button>

        <button
          class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          @click="confirm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalEventsStore } from '~~/stores/localEvents';

const props = defineProps<{
  open: boolean;
  name: string | null;
  id: string;
}>()

const store = useLocalEventsStore()
const emit = defineEmits<{
  'update:open': [boolean]
  confirm: []
}>()

function close() {
  emit('update:open', false)
}

function confirm() {
  emit('confirm');
  store.remove(props.id);
  close();
  navigateTo('/');
}
</script>
