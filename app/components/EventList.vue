<template>
  <div>
    <div v-if="eventsByDate.length" class="space-y-3">
      <div v-for="obj in eventsByDate" class="space-y-2">
        <h2 class="flex items-center gap-2 text-lg font-bold">
          <span class="grow font-stretch-75% first-letter:uppercase">{{
            obj.date
          }}</span>
        </h2>

        <div>
          <EventListItem
            v-for="event in obj.events"
            :event="event"
            :hide-locality="hideLocality"
            :key="`event-list-${event.id}`"
          />
        </div>
      </div>
    </div>
    <p v-else>Er zijn geen diensten bekend.</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ events: KFEvent[]; hideLocality?: boolean }>()

  const eventsByDate = computed(() => {
    const dates = props.events.map((e) =>
      formattedDate(e.startingAt, 'dddd DD MMM'),
    )
    const uniqDates = Array.from(new Set(dates))

    return uniqDates.map((date) => {
      const events = props.events.filter((e) => {
        return date === formattedDate(e.startingAt, 'dddd DD MMM')
      })

      return {
        date,
        events,
      }
    })
  })
</script>
