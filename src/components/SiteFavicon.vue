<script setup>
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const props = defineProps({
  url: {
    type: String,
    required: false,
    default: ''
  },
  icon: {
    type: String,
    required: false,
    default: ''
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
const link = ref('')

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
  if (props.icon) {
    link.value = props.icon
  }

  if (props.url) {
    link.value = `https://favicon.im/${getHostName(props.url)}?larger=true`
  }

  setTimeout(() => {
    loading.value = false
  }, 1200)
})
</script>

<template>
  <Skeleton
    v-if="loading"
    :class="cn(`size-full rounded-full`, $props.class)"
  />
  <img
    v-else
    :class="cn(`object-contain object-center rounded-full size-full`, $props.class)"
    :src="link"
    alt="Favicon"
    role="alert"
  >
</template>
