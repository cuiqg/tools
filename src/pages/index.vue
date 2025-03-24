<script setup>
import bg from '@/assets/img/bg.webp'

const isDark = useDark()
</script>

<template>
  <div
    class="flex size-full items-center justify-center bg-cover bg-center bg-no-repeat font-serif text-4xl font-semibold leading-none tracking-widest text-white antialiased dark:text-white"
    :style="{ 'background-image': isDark ? 'none' : `url('${bg}')` }"
  >
    <div class="flex size-auto select-none flex-row items-center justify-center leading-none">
      <AppTyped
        :options="{
          strings: ['Srihash', 'SRI 哈希生成器'],
          loop: true,
          fadeOut: true,
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 2000,
        }"
      />
    </div>
  </div>
</template>

<route lang="yaml">
name: HomePage
meta:
</route>
