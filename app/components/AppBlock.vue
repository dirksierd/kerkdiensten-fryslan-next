<template>
  <div
    class="space-y-2 rounded-lg border border-sky-200 bg-white p-3 sm:space-y-4 sm:p-6"
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
