<template>
  <div>
    <label class="block text-sm font-medium mb-1">
      {{ label }}
    </label>

    <select
      v-model="modelValue"
      class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
  options: readonly string[];
}>();

const modelValue = defineModel<string>();
</script>
