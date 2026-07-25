<template>
  <footer class="relative mt-24 overflow-hidden bg-ink text-white">
    <div class="aurora pointer-events-none absolute inset-0 opacity-[0.35]"></div>
    <div class="grid-lines pointer-events-none absolute inset-0 opacity-40"></div>

    <div class="relative mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 md:pb-14 lg:px-8 lg:pt-20">
      <!-- Support band -->
      <div
        class="flex flex-col gap-6 rounded-4xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="max-w-xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-primary-300">
            Can't find your medicine?
          </p>
          <h2 class="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Send us the prescription — we'll take it from there.
          </h2>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            Share what you need and our team will confirm availability, pricing, and the next step.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink
            to="/request-order"
            class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition duration-200 hover:bg-primary-50 active:scale-[0.98]"
          >
            Request a medicine
            <ArrowUpRight class="h-4 w-4" />
          </RouterLink>
          <RouterLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-white/10"
          >
            Contact support
          </RouterLink>
        </div>
      </div>

      <div class="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <RouterLink to="/" class="flex items-center gap-3">
            <BrandMark />
            <span class="font-display text-xl font-extrabold tracking-tight">RedPharma</span>
          </RouterLink>
          <p class="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            A clean, fast, and trusted online pharmacy experience for medicines and everyday health
            essentials — built for families across Bangladesh.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="badge in badges"
              :key="badge"
              class="rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-300 ring-1 ring-white/10"
            >
              {{ badge }}
            </span>
          </div>
        </div>

        <div v-for="column in columns" :key="column.title">
          <h3 class="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            {{ column.title }}
          </h3>
          <ul class="mt-5 space-y-3">
            <li v-for="link in column.links" :key="link.to">
              <RouterLink
                :to="link.to"
                class="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
              >
                {{ link.label }}
                <ArrowUpRight
                  class="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                />
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <p class="mt-14 rounded-2xl bg-white/[0.04] p-4 text-xs leading-6 text-slate-400 ring-1 ring-white/5">
        Always follow your physician's advice before using any medicine. Product information shown on
        this site is for reference only and is not a substitute for professional medical guidance.
      </p>

      <div
        class="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} RedPharma. All rights reserved.</p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <RouterLink to="/privacy-policy" class="hover:text-white">Privacy policy</RouterLink>
          <RouterLink to="/terms-conditions" class="hover:text-white">Terms</RouterLink>
          <RouterLink to="/refund-return" class="hover:text-white">Refund &amp; return</RouterLink>
          <RouterLink to="/remove-account" class="hover:text-white">Remove account</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import BrandMark from '../common/BrandMark.vue'

const year = new Date().getFullYear()

const badges = ['Genuine medicines', 'Secure checkout', 'Pharmacist-aware ordering']

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All categories', to: '/categories' },
      { label: 'Request order', to: '/request-order' },
      { label: 'Track order', to: '/track-order' },
      { label: 'Your cart', to: '/cart' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help center', to: '/help-center' },
      { label: 'Contact us', to: '/contact' },
      { label: 'Delivery coverage', to: '/delivery-coverage' },
      { label: 'About RedPharma', to: '/about' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', to: '/login' },
      { label: 'Create account', to: '/register' },
      { label: 'Your orders', to: '/account/orders' },
      { label: 'Membership', to: '/account/membership' },
    ],
  },
]
</script>
