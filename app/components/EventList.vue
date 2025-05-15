<template>
  <div class="space-y-2">
    <div
      v-for="obj in eventsByDate"
      class="space-y-2 rounded-xl bg-neutral-200 p-2"
    >
      <h2 class="font-bold">{{ obj.date }}</h2>

      <div class="space-y-1">
        <EventListItem
          v-for="event in obj.events"
          :event="event"
          :key="`event-list-${event.id}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ events: KFEvent[] }>()

  const eventsByDate = computed(() => {
    const dates = props.events.map((e) => formattedDate(e.startingAt, 'DD MMM'))
    const uniqDates = Array.from(new Set(dates))

    return uniqDates.map((date) => {
      const events = props.events.filter((e) => {
        return date === formattedDate(e.startingAt, 'DD MMM')
      })

      return {
        date,
        events,
      }
    })
  })
</script>
