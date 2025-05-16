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
      class="relative my-1 grow rounded-lg border border-neutral-200 bg-white px-3 pt-1 pb-2 first:mt-0 hover:z-10 sm:px-4 sm:pt-2 sm:pb-3"
    >
      <NuxtLink
        :to="`/gemeente/${event.location.congregation.id}`"
        class="block w-full truncate text-sm leading-7 font-semibold"
      >
        {{ event.location.title
        }}<template v-if="!hideLocality"
          >, {{ event.location.locality }}
          <template v-if="event.location.congregation.denomination">
            ({{ event.location.congregation.denomination.titleAbbr }})
          </template></template
        >
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

      <div v-if="event.description" class="mt-2 flex items-start gap-2 text-sm">
        <Bars3BottomLeftIcon class="mt-1 w-3 shrink-0 basis-3" />
        <div v-html="event.description" class="grow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Bars3BottomLeftIcon } from '@heroicons/vue/20/solid'

  defineProps<{ event: KFEvent; hideLocality?: boolean }>()
</script>
