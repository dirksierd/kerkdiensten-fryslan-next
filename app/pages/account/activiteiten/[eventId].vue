<template>
  <AppPage>
    <template #title>{{
      formattedDate(data?.startingAt, 'DD MMMM HH:mm')
    }}</template>
    <AppBlock>
      <template #title>Activiteit aanpassen</template>
      <form
        v-if="data"
        @submit.prevent="saveEvent"
        class="[&_span]:block [&_span]:font-bold [&>label]:block"
      >
        <label>
          <span>Start</span>
          <input v-model="startingAt" type="datetime-local" />
        </label>
        <label>
          <span>Eind</span>
          <input v-model="endingAt" type="datetime-local" />
        </label>
        <label>
          <span>Avondmaal</span>
          <input
            v-model="event.hasHolySupper"
            type="checkbox"
            :true-value="1"
            :false-value="0"
          />
        </label>
        <label>
          <span>Bijzondere dienst</span>
          <input
            v-model="event.isSpecial"
            type="checkbox"
            :true-value="1"
            :false-value="0"
          />
        </label>
        <label>
          <span>Friestalig</span>
          <input
            v-model="event.language"
            type="checkbox"
            true-value="fy"
            false-value="nl"
          />
        </label>
        <label>
          <span>Tekst</span>
          <textarea v-model="event.description"></textarea>
        </label>
      </form>
      <pre>{{ event }}</pre>
    </AppBlock>
  </AppPage>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'

  const route = useRoute()
  const startingAt = ref<string | null>(null)
  const endingAt = ref<string | null>(null)

  const event = reactive<KFFormEvent>({
    startingAt: 0,
    endingAt: 0,
    isSpecial: 0,
    description: '',
    kind: 'morning',
    hasHolySupper: 0,
    language: 'nl',
  })

  const { data, refresh } = await useFetch<KFEvent>(
    () => `/api/v1/events/${route.params.eventId}`,
  )

  if (data.value) {
    Object.assign(event, data.value)

    const format = 'YYYY-MM-DDTHH:mm'
    startingAt.value = dayjs.unix(data.value?.startingAt).format(format)
    endingAt.value = dayjs.unix(data.value?.endingAt).format(format)
  }

  const saveEvent = async () => {
    const body = JSON.stringify(event)
    const headers = { 'Content-Type': 'application/json' }

    const resp = await fetch(`/api/v1/events/${(data.value as KFEvent).id}`, {
      body,
      method: 'PUT',
      headers,
    })

    if (resp.ok) {
      refresh()
    }
  }

  watch(startingAt, (val) => {
    if (data.value && val) {
      event.startingAt = dayjs(val).unix()
    }
  })

  watch(endingAt, (val) => {
    if (data.value && val) {
      event.endingAt = dayjs(val).unix()
    }
  })
</script>
