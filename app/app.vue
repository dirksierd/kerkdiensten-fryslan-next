<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <div class="space-y-2 sm:space-y-4">
        <AppBlock
          class="fixed top-0 left-0 z-20 w-full !space-y-0 rounded-none"
        >
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

        <div class="mx-auto max-w-3xl p-2 pt-20 sm:p-4 sm:pt-34">
          <NuxtPage />
        </div>
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
