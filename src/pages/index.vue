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
    class="flex size-full items-center justify-center bg-cover bg-center bg-no-repeat font-sans text-3xl font-semibold tracking-widest antialiased"
  >
    <div class="flex size-auto select-none flex-row items-center justify-center leading-none text-zinc-700 dark:text-zinc-100">
      <AppTyped
        :options="{
          strings: [`${badSoup}`],
          loop: true,
          fadeOut: true,
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 2000,
        }"
        class="[&~.typed-cursor]:leading-none"
      />
    </div>
  </div>
</template>

<route lang="yaml">
name: HomePage
meta:
</route>
