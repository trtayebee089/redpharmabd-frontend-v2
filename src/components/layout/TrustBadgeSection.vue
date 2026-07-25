<template>
  <section
    class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-900/[0.07] ring-1 ring-slate-900/[0.07] md:grid-cols-3 xl:grid-cols-5"
    aria-label="Why shop with RedPharma"
  >
    <div
      v-for="badge in badges"
      :key="badge.title"
      class="group flex items-center gap-3 bg-white px-4 py-5 transition duration-300 hover:bg-accent-50/60 sm:px-5"
    >
      <span
        class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 transition duration-300 group-hover:scale-105 group-hover:bg-accent-100"
      >
        <component :is="badge.icon" class="h-5 w-5" :stroke-width="1.9" />
      </span>
      <span class="min-w-0">
        <span class="block truncate text-sm font-bold text-ink">{{ badge.title }}</span>
        <span class="mt-0.5 block truncate text-xs text-slate-500">{{ badge.text }}</span>
      </span>
    </div>
  </section>
</template>

<script setup>
import { BadgeCheck, CreditCard, RefreshCcw, ShieldCheck, Truck } from 'lucide-vue-next'

const badges = [
  { title: 'Genuine medicines', text: 'Sourced from licensed suppliers', icon: BadgeCheck },
  { title: 'Licensed pharmacy', text: 'Pharmacist-aware ordering', icon: ShieldCheck },
  { title: 'Fast delivery', text: 'Quick dispatch in covered zones', icon: Truck },
  { title: 'Secure payment', text: 'Safe checkout experience', icon: CreditCard },
  { title: 'Easy returns', text: 'Covered by our return policy', icon: RefreshCcw },
]
</script>
