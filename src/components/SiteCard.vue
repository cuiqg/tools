<script setup>
defineProps({
  site: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      desc: '',
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
    class="relative flex h-auto w-full flex-col gap-y-3 rounded-md border border-zinc-100 bg-zinc-50 p-4 transition-shadow hover:cursor-pointer hover:drop-shadow"
  >
    <div class="flex w-full flex-row items-center justify-start gap-x-2">
      <div class="size-5">
        <SiteFavicon
          :url="$props.site.link"
        />
      </div>
      <div class="line-clamp-1 flex-1 text-sm font-semibold tracking-widest text-foreground">
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
