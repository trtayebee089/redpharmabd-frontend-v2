<template>
  <section
    class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-ink px-6 py-10 text-white sm:px-10 sm:py-12"
  >
    <span class="grid-lines pointer-events-none absolute inset-0 opacity-40"></span>
    <span
      class="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl"
    ></span>

    <div class="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-200">
          Stay stocked
        </p>
        <h2 class="mt-4 max-w-lg font-display text-[26px] font-extrabold leading-[1.14] sm:text-[32px]">
          Never miss a refill.
        </h2>
        <p class="mt-4 max-w-lg text-sm leading-7 text-primary-100/90">
          Create a RedPharma account to keep your order history, reorder past medicines in a tap and
          track every delivery from one place.
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
        <RouterLink
          to="/register"
          class="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-ink transition duration-200 hover:bg-primary-50 active:scale-[0.98]"
        >
          Create free account
          <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" />
        </RouterLink>
        <RouterLink
          to="/account/orders"
          class="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/10 active:scale-[0.98]"
        >
          <RotateCcw class="h-4 w-4" />
          Reorder past items
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, RotateCcw } from 'lucide-vue-next'
</script>
