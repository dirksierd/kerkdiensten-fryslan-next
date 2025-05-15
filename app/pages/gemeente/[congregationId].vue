<template>
  <AppBlock>
    <template #title>{{ congregation.title }}</template>

    <div class="space-y-2">
      <p>
        Deze gemeente
        <template v-if="congregation.denomination">
          behoort tot de
          <strong>{{ congregation.denomination.title }}</strong> en
        </template>
        heeft {{ congregation.locations.length }} locatie<template
          v-if="congregation.locations.length > 1"
          >s</template
        >:
      </p>

      <ul class="list-disc pl-6">
        <li
          v-for="location in congregation.locations"
          :key="`c-l-${location.id}`"
        >
          {{ location.title }} ({{ location.street }} {{ location.houseNumber
          }}{{ location.houseNumberSuffix }}, {{ location.locality }})
        </li>
      </ul>
    </div>

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

  useHead({
    title: congregation.value.title,
  })
</script>
