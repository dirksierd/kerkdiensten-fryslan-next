<template>
  <AppPage>
    <template #title>Beheer</template>
    <AppBlock>
      <template #title>Activiteiten</template>
      <div>
        <NuxtLink
          :to="`/account/activiteiten/${event.id}`"
          v-for="event in events"
          :key="event.id"
          class="grid grid-cols-7 border-b border-neutral-300 py-1 text-sm first:border-t"
        >
          <div>
            {{ formattedDate(event.startingAt, 'HH:mm') }}
          </div>

          <div>{{ event.kind }}</div>
          <div class="col-span-5">
            <div v-if="event.description" v-html="event.description" />
            <ul class="space-x-1">
              <li
                v-for="role in event.roles"
                class="inline-block text-nowrap after:content-[','] last:after:content-['']"
              >
                {{ role.person.title }}
                {{ role.person.firstName }} {{ role.person.lastName }}
              </li>
            </ul>
          </div>
        </NuxtLink>
      </div>
    </AppBlock>
  </AppPage>
</template>

<script setup lang="ts">
  import AppBlock from '~/components/AppBlock.vue'
  import AppPage from '~/components/AppPage.vue'

  const events = ref<KFEvent[]>([])
  const loadEvents = async () => {
    const { data } = await useFetch<KFEvent[]>('/api/v1/events')
    events.value = data.value || []
  }

  loadEvents()
</script>
