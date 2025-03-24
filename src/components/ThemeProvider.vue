<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <UseDark v-slot="{ isDark, toggleDark }">
    <Button
      variant="ghost"
      @click="toggleDark()"
    >
      <i-lucide:moon
        v-if="isDark"
        class=" size-[1.2rem]  transition-all "
      />
      <i-lucide:sun
        v-else
        class="size-[1.2rem]  transition-all"
      />

      <span class="sr-only">Toggle theme</span>
    </Button>
  </UseDark>
</template>
