<template>
  <AppPage>
    <template #title>{{ title }}</template>

    <AppBlock
      v-if="person"
      class="flex flex-col gap-4 !space-y-0 text-sm sm:flex-row"
    >
      <dl>
        <template v-if="person.locality">
          <dt>Woonplaats</dt>
          <dd>{{ person.locality }}</dd>
        </template>
        <template v-if="person.denomination">
          <dt>Kerkverband</dt>
          <dd>{{ person.denomination.title }}</dd>
        </template>
      </dl>

      <ul v-if="person.roles.length" class="grow sm:text-right">
        <li v-for="role in person.roles">
          {{ roleTitles[role.role] }} bij
          <NuxtLink
            :to="`/gemeente/${role.location.congregation.id}`"
            class="underline"
            >{{ role.location.title }}</NuxtLink
          >
        </li>
      </ul>
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

  const roleTitles = {
    pastor: 'Voorganger',
  }

  const { data: events } = await useFetch<KFEvent[]>(
    '/api/v1/events?' + searchParams.toString(),
  )

  const { data: person } = await useFetch<KFPerson>(
    `/api/v1/people/${personId}`,
  )

  const title = person.value
    ? `${person.value.title} ${person.value.firstName} ${person.value.lastName}`
    : 'Onbekende voorganger'

  useHead({ title })
</script>
