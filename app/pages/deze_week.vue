<template>
  <AppBlock>
    <template #title>Deze week in Fryslân</template>
    <pre>{{ events }}</pre>
  </AppBlock>
</template>

<script setup lang="ts">
  const { data: events } = await useFetch('/api/v1/events')
  useHead({ title: 'Deze week' })
</script>
