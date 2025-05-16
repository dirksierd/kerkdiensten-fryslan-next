<template>
  <div
    class="space-y-2 rounded-lg border border-sky-200 bg-white px-3 py-2 sm:space-y-4 sm:px-6 sm:py-5"
  >
    <h1 v-if="hasTitle" class="font-title text-lg font-bold">
      <slot name="title" />
    </h1>

    <slot />
  </div>
</template>

<script setup lang="ts">
  const slots = defineSlots()
  const hasTitle = !!slots.title
</script>
