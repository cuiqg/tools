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
    class="flex size-full items-center justify-center bg-cover bg-center bg-no-repeat p-4 font-sans text-xl font-semibold tracking-widest antialiased md:text-3xl"
  >
    <div
      class="
        drak:to-zinc-900
        size-auto
        select-none
        rounded-md
        bg-gradient-to-r
        from-zinc-50
        to-zinc-100
        px-4
        py-2
        leading-loose
        text-zinc-800
        dark:from-zinc-800
        dark:text-zinc-200"
    >
      {{ badSoup }}
    </div>
  </div>
</template>

<route lang="yaml">
name: HomePage
meta:
</route>
