<template>
  <AppPage>
    <template #title>{{
      formattedDate(data?.startingAt, 'DD MMMM HH:mm')
    }}</template>
    <AppBlock>
      <template #title>Activiteit aanpassen</template>
      <pre>{{ data }}</pre>
    </AppBlock>
  </AppPage>
</template>

<script setup lang="ts">
  const route = useRoute()

  const { data } = await useFetch<KFEvent>(
    () => `/api/v1/events/${route.params.eventId}`,
  )
</script>
