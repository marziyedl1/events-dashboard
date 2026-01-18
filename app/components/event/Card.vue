<template>
  <article
    class="cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md w-full h-full"
    @click="onSelect"
  >
    <div class="flex items-start justify-between gap-2">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">
          <NuxtLink
            :to="`/event/${event.id}`"
            class="font-medium text-gray-900 hover:underline"
            @click.stop
          >
            {{ event.name }}
          </NuxtLink>
        </h3>

        <p class="text-sm text-gray-500">
          {{ event.year }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <EventTypeBadge :type="event.type" />

        <button
          class="rounded-md p-1 text-red-600 hover:bg-red-100"
          title="Delete"
          @click.stop="onDelete"
        >
          🗑️
        </button>
      </div>
    </div>

    <div class="mt-3 text-sm text-gray-600">
      <p>{{ formatDate(event.startDate) }} → {{ formatDate(event.endDate) }}</p>
    </div>
  </article>
</template>


<script setup lang="ts">
import type { ApiEvent } from '~/types'

const props = defineProps<{
  event: ApiEvent
}>()

const emit = defineEmits<{
  select: [string]
  delete: [string]
}>()

const onSelect = () => emit('select', props.event.id as string)
const onDelete = () => emit('delete', props.event.id as string)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
</script>

