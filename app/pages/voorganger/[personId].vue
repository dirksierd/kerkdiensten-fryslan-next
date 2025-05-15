<template>
  <AppPage>
    <template #title>{{ title }}</template>

    <AppBlock>
      <pre>{{ person }}</pre>
    </AppBlock>

    <AppBlock>
      <EventList v-if="events" :events="events" />
    </AppBlock>
  </AppPage>
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
