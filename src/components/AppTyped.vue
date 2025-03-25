<script setup>
import Typed from 'typed.js'

const props = defineProps({
  options: {
    type: Object,
    required: false
  }
})

const typedRef = useTemplateRef('typedRef')
let typedInstance = null

const initTyped = () => {
  try {
    if (!typedRef.value) return
    if (typedInstance) typedInstance.destroy()
    typedInstance = new Typed(typedRef.value, props.options)
  }
  catch (e) {
    console.error('Failed to create Typed instance:', e)
  }
}

onMounted(() => {
  initTyped()
})

watch(
  () => props.options,
  () => {
    initTyped()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  typedInstance?.destroy()
})

defineExpose({ typedRef, typedInstance })
</script>

<template>
  <div ref="typedRef">
    <slot>
      <span class="typing" />
    </slot>
  </div>
</template>
