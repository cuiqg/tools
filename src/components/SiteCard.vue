<script setup>
defineProps({
  site: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      desc: '',
      icon: '',
      link: ''
    })
  }
})
</script>

<template>
  <a
    :href="$props.site.link"
    rel="noopener"
    target="_blank"
    data-umami-event="click_site_card"
    :data-umami-event-props="{ site: $props.site.link, title: $props.site.title }"
    class="relative flex h-auto w-full flex-col gap-y-3 rounded-md border border-zinc-100 bg-zinc-50 p-4 transition-shadow hover:cursor-pointer hover:drop-shadow dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div class="flex w-full flex-row items-center justify-start gap-x-2">
      <div class="size-5">
        <SiteFavicon
          :url="$props.site.link"
          :icon="$props.site.icon"
        />
      </div>
      <div class="line-clamp-1 flex-1 text-sm font-semibold leading-none tracking-widest text-foreground">
        {{ $props.site.title }}
      </div>
    </div>
    <div
      v-if="$props.site.desc"
      class="line-clamp-2 text-sm tracking-widest text-muted-foreground"
    >
      {{ $props.site.desc }}
    </div>
  </a>
</template>
