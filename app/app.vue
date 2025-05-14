<template>
  <div class="p-4 max-w-3xl mx-auto">
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <div class="space-y-4">
        <AppBlock class="max-w-sm">
          <template #title>
            <NuxtLink
              to="/"
              class="hover:underline hover:underline-offset-2 truncate block text-3xl"
              >Kerkdiensten<strong>Fryslân</strong></NuxtLink
            >
          </template>

          <p>Hier bouwen wij aan de toekomst.</p>
        </AppBlock>

        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
