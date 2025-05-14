<template>
  <div class="bg-white shadow-lg rounded-xl p-6">
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
