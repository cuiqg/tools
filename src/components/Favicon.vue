<script setup>
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

defineProps({
  url: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: false,
    default: ''
  },
  width: {
    type: [String, Number],
    required: false,
    default: '24'
  },
  height: {
    type: [String, Number],
    required: false,
    default: '24'
  }
})

const loading = ref(true)

const getHostName = (url) => {
  try {
    const intiUrl = new URL(url)
    return intiUrl.hostname
  }
  catch (e) {
    return null
  }
}

watchEffect(() => {
  setTimeout(() => {
    loading.value = false
  }, 1200)
})
</script>

<template>
  <Skeleton
    v-if="loading"
    :class="cn($props.class)"
    :width="$props.width"
    :height="$props.height"
  />
  <img
    v-else
    :class="cn($props.class)"
    :width="$props.width"
    :height="$props.height"
    :src="`https://favicon.im/${getHostName($props.url)}?larger=true`"
    alt="Favicon"
    role="alert"
  >
</template>
