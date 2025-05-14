<template>
  <AppBlock>
    <template #title>Voorganger {{ $route.params.slug }}</template>
    <pre>{{ data }}</pre>
  </AppBlock>
</template>

<script setup lang="ts">
  const route = useRoute()
  const personId = route.params.personId as string
  const searchParams = new URLSearchParams({ personId })
  const { data } = useFetch('/api/v1/events?' + searchParams.toString())
</script>
