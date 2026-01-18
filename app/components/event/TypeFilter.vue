<template>
  <div class="ml-auto">
    <label class="text-sm font-medium mr-2">Type</label>
    <select
      :value="modelValue"
      class="rounded-lg border border-gray-300 px-3 py-2 text-sm"
      @change="onChange"
    >
      <option value="all">All</option>
      <option value="OnSite">OnSite</option>
      <option value="Online">Online</option>
      <option value="Hybrid">Hybrid</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { EventType } from '~/types'

defineProps<{
  modelValue: 'all' | EventType
}>()

const emit = defineEmits<{
  'update:modelValue': ['all' | EventType]
}>()

function onChange(event: Event) {
  emit(
    'update:modelValue',
    (event.target as HTMLSelectElement).value as 'all' | EventType
  )
}
</script>
