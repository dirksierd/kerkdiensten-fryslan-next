<template>
  <div>
    <NuxtRouteAnnouncer />

    <header class="font-title bg-white text-sky-600">
      <div class="mx-auto max-w-3xl p-3 sm:px-4">
        <NuxtLink
          to="/"
          class="block truncate text-2xl hover:underline hover:underline-offset-2"
          >Kerkdiensten<strong>Fryslân</strong></NuxtLink
        >
      </div>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      const baseTitle = 'Kerkdiensten Fryslân'
      return title ? `${title} - ${baseTitle}` : baseTitle
    },
  })
</script>
