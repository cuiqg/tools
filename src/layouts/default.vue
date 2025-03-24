<script setup>
import { SidebarProvider } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <div class="grid flex-1 grid-rows-[auto_1fr_auto]">
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
