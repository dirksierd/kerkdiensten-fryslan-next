<template>
  <div class="mx-auto max-w-3xl p-2 sm:p-4">
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <div class="space-y-2 sm:space-y-4">
        <AppBlock class="max-w-sm !space-y-0">
          <template #title>
            <NuxtLink
              to="/"
              class="block truncate text-2xl font-normal hover:underline hover:underline-offset-2 sm:text-3xl"
              >Kerkdiensten<strong>Fryslân</strong></NuxtLink
            >
          </template>

          <p class="text-sm sm:text-base">
            Hier bouwen wij aan de nieuwe site.
          </p>
        </AppBlock>

        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      const baseTitle = 'Kerkdiensten Fryslân'
      return title ? `${title} ~ ${baseTitle}` : baseTitle
    },
  })
</script>
