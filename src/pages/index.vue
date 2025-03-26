<script setup>
const badSoup = ref('')

watchEffect(() => {
  soup().then((res) => {
    badSoup.value = res
  })
})
</script>

<template>
  <div
    class="
    flex
    size-full
    items-center
    justify-center
    bg-cover
    bg-center
    bg-no-repeat
    p-4
    text-xl
    font-semibold
    tracking-normal
    antialiased
    md:text-3xl"
  >
    <div
      v-if="badSoup"
      class="
        hover:animate-ease-in-out
        hover:animate-once
        size-auto
        select-none
        rounded-md
        bg-zinc-100
        px-4
        py-2
        font-serif
        leading-normal
        text-zinc-900
        hover:animate-pulse
        hover:cursor-pointer
        dark:bg-zinc-900
        dark:text-zinc-100
        "
    >
      {{ badSoup }}
    </div>
  </div>
</template>

<route lang="yaml">
name: HomePage
meta:
  title: 首页
</route>
