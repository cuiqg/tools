<template>
  <SidebarProvider>
    <AppSidebar />
    <div class="relative grid flex-1 grid-rows-[auto_1fr]">
      <AppHeader />
      <main class="relative">
        <RouterView v-slot="{ Component, route }">
          <component
            :is="Component"
            :key="route"
          />
        </RouterView>
      </main>
    </div>
  </SidebarProvider>
</template>
