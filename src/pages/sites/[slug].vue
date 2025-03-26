<script setup>
import sites from '@/data/sites'

const route = useRoute()

const keSites = ref([])

if (Object.keys(sites).includes(route.params?.slug)) {
  keSites.value = sites[route.params.slug]
}
</script>

<template>
  <div class="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
    <SiteCard
      v-for="site in keSites"
      :key="site"
      :site="site"
    />
  </div>
</template>

<route lang="yaml">
name: SitesPage
meta:
  title: 网址导航
</route>
