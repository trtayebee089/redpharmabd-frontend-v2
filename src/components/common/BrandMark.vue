<template>
  <span class="inline-grid shrink-0 place-items-center" :class="sizeClass">
    <svg viewBox="0 0 44 44" fill="none" class="h-full w-full" aria-hidden="true">
      <rect width="44" height="44" rx="14" :fill="`url(#bm-a-${uid})`" />
      <path
        d="M22 10.5c-4.6 0-8.3 3.6-8.3 8.1 0 5.9 6.4 11.4 7.8 12.5.3.2.7.2 1 0 1.4-1.1 7.8-6.6 7.8-12.5 0-4.5-3.7-8.1-8.3-8.1Z"
        fill="#fff"
        fill-opacity="0.16"
      />
      <path
        d="M19.6 14.9h4.8v3.9h3.9v4.8h-3.9v3.9h-4.8v-3.9h-3.9v-4.8h3.9v-3.9Z"
        fill="#fff"
      />
      <defs>
        <linearGradient :id="`bm-a-${uid}`" x1="0" y1="0" x2="44" y2="44">
          <stop stop-color="#ef444e" />
          <stop offset="0.55" stop-color="#dc2632" />
          <stop offset="1" stop-color="#991b23" />
        </linearGradient>
      </defs>
    </svg>
  </span>
</template>

<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  size: { type: String, default: 'md' },
})

const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')

const sizeClass = computed(
  () => ({ sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-14 w-14' })[props.size] || 'h-11 w-11',
)
</script>
