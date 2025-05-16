<template>
  <AppPage>
    <template #title>{{
      congregation?.title || 'Onbekende gemeente'
    }}</template>

    <AppBlock
      v-if="congregation"
      class="flex flex-col gap-4 !space-y-0 text-sm sm:flex-row"
    >
      <dl>
        <template v-if="congregation.url">
          <dt>Website</dt>
          <dd>
            <a
              :href="congregation.url + '?utm_source=kerkdienstenfryslan'"
              class="flex items-center gap-1 underline"
              >Bezoeken <ArrowTopRightOnSquareIcon class="size-3"
            /></a>
          </dd>
        </template>
        <template v-if="congregation.denomination">
          <dt>Kerkverband</dt>
          <dd>{{ congregation.denomination.title }}</dd>
        </template>
      </dl>

      <ul class="grow sm:text-right">
        <li v-for="location in congregation.locations">
          <strong class="block">{{ location.title }}</strong
          >{{ location.street }} {{ location.houseNumber
          }}{{ location.houseNumberSuffix }},
          {{ location.locality }}
        </li>
      </ul>
    </AppBlock>

    <AppBlock>
      <EventList v-if="events" :events="events" />
    </AppBlock>
  </AppPage>
</template>

<script setup lang="ts">
  import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid'

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
