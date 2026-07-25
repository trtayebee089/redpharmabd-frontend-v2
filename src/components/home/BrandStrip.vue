<template>
  <section v-if="brands.length >= 4">
    <SectionHeader
      eyebrow="Trusted suppliers"
      title="Featured brands"
      subtitle="Sourced from established pharmaceutical manufacturers."
    />
    <div class="mask-fade-x overflow-hidden py-1">
      <div class="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        <span
          v-for="(brand, index) in loop"
          :key="`${brand}-${index}`"
          class="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-900/[0.07]"
        >
          <span
            class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-50 font-display text-sm font-extrabold text-primary-600"
          >
            {{ brand.charAt(0) }}
          </span>
          <span class="whitespace-nowrap text-sm font-bold text-ink">{{ brand }}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../common/SectionHeader.vue'

const props = defineProps({
  brands: { type: Array, default: () => [] },
})

/* Duplicated so the marquee's -50% translation loops seamlessly. */
const loop = computed(() => [...props.brands, ...props.brands])
</script>
