<template>
  <div class="rounded-4xl bg-white p-10 text-center ring-1 ring-slate-900/[0.06]">
    <div
      class="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-sky-50 text-primary-600 ring-1 ring-primary-100"
    >
      <PackageSearch class="h-7 w-7" :stroke-width="1.6" />
    </div>
    <h3 class="mt-5 font-display text-lg font-extrabold text-ink">{{ title }}</h3>
    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{{ message }}</p>
    <slot />
  </div>
</template>

<script setup>
import { PackageSearch } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'Nothing here yet' },
  message: { type: String, default: 'Try changing your filters or search terms.' },
})
</script>
