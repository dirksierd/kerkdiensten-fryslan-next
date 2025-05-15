<template>
  <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
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
