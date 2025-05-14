<template>
  <AppBlock>
    <template #title>Voorganger {{ $route.params.slug }}</template>
    <pre>{{ person }}</pre>
    <pre>{{ events }}</pre>
  </AppBlock>
</template>

<script setup lang="ts">
  const route = useRoute()
  const personId = route.params.personId as string
  const searchParams = new URLSearchParams({ personId })

  const { data: events } = await useFetch(
    '/api/v1/events?' + searchParams.toString(),
  )

  const { data: person } = await useFetch(`/api/v1/people/${personId}`)
</script>
