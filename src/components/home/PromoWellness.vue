<template>
  <section
    class="relative grid overflow-hidden rounded-3xl bg-gradient-to-br from-accent-50 via-white to-primary-50/60 ring-1 ring-slate-900/[0.07] lg:grid-cols-[1.1fr_0.9fr]"
  >
    <div class="p-7 sm:p-10">
      <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
        Wellness collection
      </p>
      <h2
        class="mt-4 max-w-md font-display text-[26px] font-extrabold leading-[1.12] text-ink sm:text-[34px]"
      >
        Build a healthier routine, one order at a time.
      </h2>
      <p class="mt-4 max-w-md text-sm leading-7 text-slate-600">
        Vitamins, daily supplements, personal care and home health essentials — curated so you can
        restock without hunting through endless listings.
      </p>
      <div class="mt-7 flex flex-wrap gap-3">
        <RouterLink
          to="/categories"
          class="group inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-600/20 transition duration-200 hover:bg-accent-700 active:scale-[0.98]"
        >
          Explore collection
          <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" />
        </RouterLink>
        <RouterLink
          to="/delivery-coverage"
          class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-sm ring-1 ring-slate-900/[0.08] transition hover:ring-accent-300"
        >
          Check delivery area
        </RouterLink>
      </div>
    </div>

    <div class="relative min-h-[200px] overflow-hidden">
      <span class="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-accent-200/50 blur-2xl"></span>
      <span class="absolute bottom-0 right-16 h-48 w-48 rounded-full bg-primary-200/40 blur-2xl"></span>
      <div class="absolute inset-0 grid content-center gap-3 p-7 sm:p-10 lg:justify-items-end">
        <div
          v-for="(pillar, index) in pillars"
          :key="pillar.title"
          class="flex w-full max-w-[300px] items-center gap-3 rounded-2xl bg-white/85 p-3.5 shadow-card ring-1 ring-white backdrop-blur"
          :class="index === 1 ? 'lg:-translate-x-8' : ''"
        >
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700">
            <component :is="pillar.icon" class="h-5 w-5" :stroke-width="1.8" />
          </span>
          <span class="min-w-0">
            <span class="block text-[13px] font-bold text-ink">{{ pillar.title }}</span>
            <span class="block truncate text-[11px] text-slate-500">{{ pillar.text }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, HeartPulse, Sparkles, Stethoscope } from 'lucide-vue-next'

const pillars = [
  { title: 'Daily vitamins', text: 'Immunity and energy support', icon: Sparkles },
  { title: 'Home health', text: 'Monitors and testing kits', icon: Stethoscope },
  { title: 'Family care', text: 'Everyday cabinet essentials', icon: HeartPulse },
]
</script>
