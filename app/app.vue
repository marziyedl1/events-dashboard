<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useLocalEventsStore } from "@/stores/localEvents";
import { useGetEventListQuery } from "./composables/useGetEventListQuery";

const store = useLocalEventsStore()

const { data, isSuccess } = useGetEventListQuery()

watchEffect(() => {
  if (isSuccess.value && data.value) {
    store.init(data.value)
  }
})

</script>
