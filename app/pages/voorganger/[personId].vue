<template>
  <AppBlock>
    <template #title>{{ title }}</template>
    <pre>{{ person }}</pre>
    <EventList v-if="events" :events="events" />
  </AppBlock>
</template>

<script setup lang="ts">
  const route = useRoute()
  const personId = route.params.personId as string
  const searchParams = new URLSearchParams({ personId })

  const { data: events } = await useFetch<KFEvent[]>(
    '/api/v1/events?' + searchParams.toString(),
  )

  const { data: person } = await useFetch(`/api/v1/people/${personId}`)

  const title = person.value
    ? `${person.value.title}. ${person.value.firstName} ${person.value.lastName}`
    : 'Onbekende voorganger'

  useHead({ title })
</script>
