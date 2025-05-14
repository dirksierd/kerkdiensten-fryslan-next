<template>
  <div class="p-4 max-w-3xl mx-auto">
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <div class="space-y-4">
        <AppBlock class="max-w-sm">
          <h1 class="text-2xl font-title">
            <NuxtLink
              to="/"
              class="hover:underline hover:underline-offset-2 truncate block"
              >Kerkdiensten<strong>Fryslân</strong></NuxtLink
            >
          </h1>
          <p>Hier bouwen wij aan de toekomst.</p>
        </AppBlock>

        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
