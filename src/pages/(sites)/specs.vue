<script setup>
import { Button } from '@/components/ui/button'
import sites from '@/data/sites'
</script>

<template>
  <div class="flex size-full flex-row items-start justify-start gap-4 p-4">
    <Button
      v-for="site in sites.specs"
      :key="site"
      as-child
      variant="secondary"
    >
      <a
        :href="site.link"
        class="tracking-widest"
      >
        <Favicon
          :url="site.link"
          class="size-4"
        />
        <span>{{ site.title }}</span>
      </a>
    </Button>
  </div>
</template>
