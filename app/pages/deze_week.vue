<template>
  <AppBlock>
    <template #title>Deze week in Fryslân</template>
    <EventList v-if="events" :events="events" />
  </AppBlock>
</template>

<script setup lang="ts">
  const { data: events } = await useFetch<KFEvent[]>('/api/v1/events')
  useHead({ title: 'Deze week' })
</script>
