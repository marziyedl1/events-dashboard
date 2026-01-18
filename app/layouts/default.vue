<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="border-b bg-white">
      <div
        class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
      >
        <NuxtLink
          to="/"
          class="text-lg font-semibold"
        >
          Event Dashboard
        </NuxtLink>
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/event"
            class="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            New
          </NuxtLink>
          <NuxtLink
            to="/"
            class="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Home
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6 min-h-[calc(100vh-8rem)]">
      <slot />
    </main>

    <footer class="border-t bg-white">
      <div class="mx-auto max-w-5xl px-4 py-4 text-xs text-gray-500">
        ADITUS GmbH | Straße der Nationen 5 30539 Hannover
      </div>
    </footer>
  </div>
</template>
