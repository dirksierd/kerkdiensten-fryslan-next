<template>
  <div class="group flex items-stretch gap-4">
    <div class="flex w-14 shrink-0 basis-14 items-center text-sky-600">
      <time
        :datetime="formattedDate(event.startingAt)"
        class="block text-sm font-semibold font-stretch-75%"
      >
        {{ formattedDate(event.startingAt, 'HH:mm') }}
      </time>

      <div class="ml-auto flex h-full w-0 items-center border border-sky-100">
        <i
          class="-ml-[6px] block size-3 shrink-0 basis-3 rounded-full border-2 border-white bg-sky-600"
        />
      </div>
    </div>

    <div
      class="relative my-1 grow rounded-lg bg-sky-100 p-3 pt-2 first:mt-0 hover:z-10"
    >
      <NuxtLink
        :to="`/gemeente/${event.location.congregation.id}`"
        class="block leading-7"
      >
        {{ event.location.title }}, {{ event.location.locality }}
        <template v-if="event.location.congregation.denomination">
          ({{ event.location.congregation.denomination.titleAbbr }})
        </template>
      </NuxtLink>

      <div class="overflow-hidden">
        <NuxtLink
          v-for="role in event.roles"
          :key="`role-${role.role}-${role.person.id}`"
          :to="`/voorganger/${role.person.id}`"
          class="mr-1 inline-block rounded-md border border-neutral-200 bg-white px-2 text-sm group-hover:border-neutral-400 hover:border-sky-600"
        >
          {{ role.person.title }} {{ role.person.firstName }}
          {{ role.person.lastName }}
        </NuxtLink>
      </div>

      <div v-if="event.description" class="mt-2 flex gap-2 text-sm">
        <Bars3BottomLeftIcon class="w-3 shrink-0 basis-3" />
        <div v-html="event.description" class="grow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Bars3BottomLeftIcon } from '@heroicons/vue/20/solid'

  defineProps<{ event: KFEvent }>()
</script>
