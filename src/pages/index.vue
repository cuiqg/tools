<script setup>
const isDark = useDark()
</script>

<template>
  <div
    class="relative flex
      size-full
      items-center
      justify-center
      overflow-hidden
      antialiased"
  >
    <FallingStarsBg
      :count="300"
      :color="isDark ? '#fff' : '#555'"
      class="bg-white dark:bg-black"
    />

    <div class="z-[1] flex items-center">
      <h1 class="select-none bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-6xl font-black tracking-[.1em] text-transparent">
        Tsui Tools.
      </h1>
    </div>
  </div>
</template>

<route lang="yaml">
name: HomePage
</route>
