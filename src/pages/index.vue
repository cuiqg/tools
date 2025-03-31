<script setup>
const badSoup = ref('')
const { width, height } = useWindowSize()
watchEffect(() => {
  soup().then((res) => {
    badSoup.value = res
  })
})

const windowWidth = computed(() => (
  width.value - 225
))
const windowHeight = computed(() => (
  height.value - 64
))
</script>

<template>
  <div
    class="
    relative
    flex
    size-full
    items-center
    justify-center
    overflow-hidden
    bg-cover
    bg-center
    bg-no-repeat
    text-xl
    font-semibold
    tracking-normal
    antialiased
    md:text-3xl"
  >
    <FlickeringGrid
      class="relative inset-0 z-0 flex items-center justify-center [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      :square-size="20"
      :grid-gap="6"
      color="#60A5FA"
      :max-opacity="0.5"
      :flicker-chance="0.1"
      :width="windowWidth"
      :height="windowHeight"
    />
    <div
      v-if="badSoup"
      class="
        hover:animate-ease-in-out
        hover:animate-once
        z-1
        absolute
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
        hover:bg-zinc-900/20
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
