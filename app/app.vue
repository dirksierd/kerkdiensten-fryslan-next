<template>
  <div class="mx-auto max-w-3xl p-4">
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <div class="space-y-4">
        <AppBlock class="max-w-sm !space-y-0">
          <template #title>
            <NuxtLink
              to="/"
              class="block truncate text-3xl font-normal hover:underline hover:underline-offset-2"
              >Kerkdiensten<strong>Fryslân</strong></NuxtLink
            >
          </template>

          <p>Hier bouwen wij aan de nieuwe site.</p>
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
