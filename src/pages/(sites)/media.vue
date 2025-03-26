<script setup>
import { Button } from '@/components/ui/button'
import sites from '@/data/sites'
</script>

<template>
  <div class="size-full p-4">
    <Button
      v-for="site in sites.media"
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
          class="size-4 rounded-full object-contain object-center"
        />
        <span>{{ site.title }}</span>
      </a>
    </Button>
  </div>
</template>
