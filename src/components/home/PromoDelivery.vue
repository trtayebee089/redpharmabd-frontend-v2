<template>
  <section class="grid gap-3 md:grid-cols-3">
    <RouterLink
      v-for="(card, index) in cards"
      :key="card.to"
      :to="card.to"
      class="group relative flex items-center gap-4 overflow-hidden rounded-2xl p-6 ring-1 transition duration-300 ease-premium hover:-translate-y-1 hover:shadow-card"
      :class="card.shell"
    >
      <span
        class="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-60 transition duration-500 group-hover:scale-125"
        :class="card.blob"
      ></span>
      <span
        class="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5"
        :class="card.icon"
      >
        <component :is="card.glyph" class="h-6 w-6" :stroke-width="1.7" />
      </span>
      <span class="relative min-w-0 flex-1">
        <span class="block font-display text-[15px] font-extrabold text-ink">{{ card.title }}</span>
        <span class="mt-1 block text-[12px] leading-5 text-slate-600">{{ card.text }}</span>
      </span>
      <ArrowRight
        class="relative h-4 w-4 shrink-0 text-slate-400 transition duration-200 group-hover:translate-x-1 group-hover:text-ink"
        :class="index === 0 ? '' : ''"
      />
    </RouterLink>
  </section>
</template>

<script setup>
import { ArrowRight, Headset, MapPin, Truck } from 'lucide-vue-next'

const cards = [
  {
    title: 'Free delivery over ৳999',
    text: 'Delivery charge is waived on larger orders at checkout.',
    to: '/delivery-coverage',
    glyph: Truck,
    shell: 'bg-accent-50 ring-accent-100',
    blob: 'bg-accent-200/50',
    icon: 'text-accent-700',
  },
  {
    title: 'Check your area',
    text: 'Confirm we deliver to your location before you order.',
    to: '/delivery-coverage',
    glyph: MapPin,
    shell: 'bg-primary-50 ring-primary-100',
    blob: 'bg-primary-200/50',
    icon: 'text-primary-600',
  },
  {
    title: 'Talk to our team',
    text: 'Help with products, prescriptions, payment and delivery.',
    to: '/contact',
    glyph: Headset,
    shell: 'bg-slate-100 ring-slate-200',
    blob: 'bg-slate-200/60',
    icon: 'text-ink',
  },
]
</script>
