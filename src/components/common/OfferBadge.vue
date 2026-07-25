<template>
  <span
    v-if="discount"
    class="inline-flex items-center rounded-md bg-primary-600 px-1.5 py-1 text-[10px] font-bold leading-none text-white shadow-sm"
  >
    -{{ discount }}%
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  price: { type: [Number, String], default: 0 },
  discountPrice: { type: [Number, String, null], default: null },
})

const discount = computed(() => {
  const price = Number(props.price || 0)
  const offer = Number(props.discountPrice || 0)
  if (!price || !offer || offer >= price) return 0
  return Math.round(((price - offer) / price) * 100)
})
</script>
