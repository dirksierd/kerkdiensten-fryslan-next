<template>
  <AppPage>
    <template #title>{{
      congregation?.title || 'Onbekende gemeente'
    }}</template>

    <AppBlock>
      <div v-if="congregation" class="space-y-2">
        <p>
          Deze gemeente
          <template v-if="congregation.denomination">
            behoort tot de
            <strong>{{ congregation.denomination.title }}</strong> en
          </template>
          heeft {{ congregation.locations.length }} vierplek<template
            v-if="congregation.locations.length > 1"
            >ken</template
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
    </AppBlock>

    <AppBlock>
      <EventList v-if="events" :events="events" />
    </AppBlock>
  </AppPage>
</template>

<script setup lang="ts">
  const route = useRoute()
  const congregationId = route.params.congregationId as string
  const searchParams = new URLSearchParams({ congregationId })

  const { data: events } = await useFetch<KFEvent[]>(
    '/api/v1/events?' + searchParams.toString(),
  )

  const { data: congregation } = await useFetch<KFCongregation>(
    `/api/v1/congregations/${congregationId}`,
  )

  useHead({
    title: congregation.value?.title,
  })
</script>
