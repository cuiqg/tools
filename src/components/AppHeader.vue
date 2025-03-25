<script setup>
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <header class="flex h-[64px] w-full items-stretch justify-center px-4">
    <div class="mx-auto flex w-full flex-row items-stretch justify-between gap-x-2">
      <div class="inline-flex items-center justify-center">
        <SidebarTrigger />
      </div>

      <div class="inline-flex items-center justify-center">
        <ThemeProvider />
      </div>
    </div>
  </header>
</template>
