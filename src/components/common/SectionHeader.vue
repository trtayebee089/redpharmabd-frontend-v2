<template>
  <div class="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mb-6">
    <div class="min-w-0">
      <p
        v-if="eyebrow"
        class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]"
        :class="invert ? 'text-primary-300' : accentTone ? 'text-accent-600' : 'text-primary-700'"
      >
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="invert ? 'bg-primary-400' : accentTone ? 'bg-accent-500' : 'bg-primary-500'"
        ></span>
        {{ eyebrow }}
      </p>
      <h2
        class="mt-2 font-display text-[22px] font-extrabold leading-tight sm:text-[28px]"
        :class="invert ? 'text-white' : 'text-ink'"
      >
        {{ title }}
      </h2>
      <p
        v-if="subtitle"
        class="mt-2 max-w-xl text-sm leading-6"
        :class="invert ? 'text-slate-300' : 'text-slate-500'"
      >
        {{ subtitle }}
      </p>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
      <RouterLink
        v-if="to"
        :to="to"
        class="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition"
        :class="
          invert
            ? 'text-white ring-1 ring-white/20 hover:bg-white/10'
            : 'text-primary-800 ring-1 ring-primary-200 hover:bg-primary-50'
        "
      >
        {{ linkLabel }}
        <ArrowRight class="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  to: { type: String, default: '' },
  linkLabel: { type: String, default: 'View all' },
  tone: { type: String, default: 'default' },
})

const invert = computed(() => props.tone === 'invert')
const accentTone = computed(() => props.tone === 'accent')
</script>
