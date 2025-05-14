<template>
  <AppBlock>
    <template #title>Gemeente</template>
    <pre>{{ congregation }}</pre>
    <EventList v-if="events" :events="events" />
  </AppBlock>
</template>

<script setup lang="ts">
  const route = useRoute()
  const congregationId = route.params.congregationId as string
  const searchParams = new URLSearchParams({ congregationId })

  const { data: events } = await useFetch<KFEvent[]>(
    '/api/v1/events?' + searchParams.toString(),
  )

  const { data: congregation } = await useFetch(
    `/api/v1/congregations/${congregationId}`,
  )
</script>
