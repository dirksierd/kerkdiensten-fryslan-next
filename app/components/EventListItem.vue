<template>
  <div class="rounded-lg bg-neutral-100 p-3 pt-2">
    <time :datetime="startingAt.toISOString()" class="block h-6 font-bold">
      {{ startingAt.format('DD MMM HH:mm') }}
    </time>

    <div>
      <NuxtLink :to="`/gemeente/${event.location.congregation.id}`">
        {{ event.location.title }}, {{ event.location.locality }}
        <template v-if="event.location.congregation.denomination">
          ({{ event.location.congregation.denomination.titleAbbr }})
        </template>
      </NuxtLink>
    </div>

    <div class="overflow-hidden">
      <NuxtLink
        v-for="role in event.roles"
        :key="`role-${role.role}-${role.person.id}`"
        :to="`/voorganger/${role.person.id}`"
        class="mr-1 inline-block rounded-md border bg-white px-2 text-sm"
      >
        {{ role.person.title }}. {{ role.person.firstName }}
        {{ role.person.lastName }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import tz from 'dayjs/plugin/timezone'
  import utc from 'dayjs/plugin/utc'
  import nl from 'dayjs/locale/nl'

  dayjs.locale(nl)
  dayjs.extend(tz)
  dayjs.extend(utc)

  const props = defineProps<{ event: KFEvent }>()
  const startingAt = dayjs.unix(props.event.startingAt).tz('Europe/Amsterdam')
</script>
