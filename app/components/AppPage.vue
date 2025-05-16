<template>
  <div>
    <div v-if="hasLeader || hasTitle" class="bg-sky-200 text-sky-600">
      <div
        class="mx-auto max-w-3xl px-3 py-1 sm:space-y-4 sm:px-4 sm:py-2 [&>*]:truncate"
      >
        <slot v-if="hasLeader" name="leader" />

        <div v-if="hasTitle" class="font-title text-lg">
          <slot name="title" />
        </div>
      </div>
    </div>

    <div
      class="mx-auto max-w-3xl space-y-3 p-3 pb-6 sm:space-y-6 sm:px-4 sm:py-6"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const hasLeader = !!slots.leader
  const hasTitle = !!slots.title
</script>
