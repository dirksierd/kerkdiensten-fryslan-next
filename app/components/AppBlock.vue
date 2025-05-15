<template>
  <div
    class="space-y-2 rounded-lg bg-white px-3 py-2 shadow-sm sm:space-y-4 sm:p-6"
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
