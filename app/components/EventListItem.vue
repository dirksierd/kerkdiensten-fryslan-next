<template>
  <div
    class="group relative -mt-[1px] border border-neutral-200 bg-white p-3 pt-2 first:mt-0 first:rounded-t-md last:rounded-b-md hover:z-10 hover:border-neutral-400"
  >
    <time
      :datetime="formattedDate(event.startingAt)"
      class="block h-6 font-semibold"
    >
      {{ formattedDate(event.startingAt, 'HH:mm') }}
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
        class="mr-1 inline-block rounded-md border border-neutral-200 bg-white px-2 text-sm group-hover:border-neutral-400 hover:border-sky-600"
      >
        {{ role.person.title }}. {{ role.person.firstName }}
        {{ role.person.lastName }}
      </NuxtLink>
    </div>

    <div v-if="event.description" class="mt-2 flex gap-2 text-sm">
      <Bars3BottomLeftIcon class="w-3 shrink-0 basis-3" />
      <div v-html="event.description" class="grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Bars3BottomLeftIcon } from '@heroicons/vue/20/solid'

  defineProps<{ event: KFEvent }>()
</script>
