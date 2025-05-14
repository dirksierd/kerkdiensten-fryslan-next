<template>
  <AppBlock>
    <template #title>Gemeente</template>
    <pre>{{ congregation }}</pre>
    <pre>{{ events }}</pre>
  </AppBlock>
</template>

<script setup lang="ts">
  const route = useRoute()
  const congregationId = route.params.congregationId as string
  const searchParams = new URLSearchParams({ congregationId })

  const { data: events } = await useFetch(
    '/api/v1/events?' + searchParams.toString(),
  )

  const { data: congregation } = await useFetch(
    `/api/v1/congregations/${congregationId}`,
  )
</script>
