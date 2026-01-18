<script setup lang="ts">
import type { EventType } from '~/types'


defineProps<{ type: EventType }>()

const classesByType: Record<EventType, string> = {
  Online: 'bg-blue-100 text-blue-800',
  OnSite: 'bg-emerald-100 text-emerald-800',
  Hybrid: 'bg-purple-100 text-purple-800'
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
    :class="classesByType[type]"
  >
    {{ type }}
  </span>
</template>
