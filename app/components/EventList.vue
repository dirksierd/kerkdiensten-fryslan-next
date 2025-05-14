<template>
  <div class="space-y-2">
    <EventListItem
      v-for="event in events"
      :event="event"
      :key="`event-list-${event.id}`"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{ events: KFEvent[] }>()
</script>
