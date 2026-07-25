<template>
  <section class="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
    <RouterLink
      to="/contact"
      class="group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-900/[0.07] transition duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-card sm:p-9"
    >
      <span
        class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-50 transition duration-500 group-hover:scale-125"
      ></span>
      <div class="relative">
        <span class="grid h-12 w-12 place-items-center rounded-2xl bg-accent-50 text-accent-700">
          <Headset class="h-6 w-6" :stroke-width="1.7" />
        </span>
        <h3
          class="mt-6 max-w-sm font-display text-2xl font-extrabold leading-tight text-ink sm:text-[28px]"
        >
          Unsure what to order? Talk to our support team.
        </h3>
        <p class="mt-3 max-w-md text-sm leading-6 text-slate-500">
          Get help with product selection, prescriptions, payment and delivery — before or after you
          place an order.
        </p>
      </div>
      <span class="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-700">
        Contact support
        <ArrowRight class="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
      </span>
    </RouterLink>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="group flex items-center gap-4 rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.07] transition duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-card"
      >
        <span
          class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-50 text-ink ring-1 ring-slate-900/5 transition duration-300 group-hover:bg-primary-50 group-hover:text-primary-600"
        >
          <component :is="link.icon" class="h-5 w-5" :stroke-width="1.8" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block font-display text-base font-extrabold text-ink">{{ link.title }}</span>
          <span class="mt-1 block text-[13px] leading-5 text-slate-500">{{ link.text }}</span>
        </span>
        <ArrowRight
          class="h-4 w-4 shrink-0 text-slate-300 transition duration-200 group-hover:translate-x-1 group-hover:text-primary-600"
        />
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Headset, HelpCircle, Truck } from 'lucide-vue-next'

const links = [
  {
    title: 'Track your order',
    text: 'Follow your order from dispatch to doorstep.',
    to: '/track-order',
    icon: Truck,
  },
  {
    title: 'Help center',
    text: 'Answers on ordering, payment, returns and delivery.',
    to: '/help-center',
    icon: HelpCircle,
  },
]
</script>
