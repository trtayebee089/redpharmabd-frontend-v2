<template>
  <!-- Feature tile: the anchor of the category mosaic -->
  <RouterLink
    v-if="variant === 'feature'"
    :to="`/category/${category.slug}`"
    class="group relative flex min-h-[196px] min-w-0 flex-col justify-between overflow-hidden rounded-[22px] bg-ink p-5 text-white transition duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-glow sm:p-6"
  >
    <span class="aurora pointer-events-none absolute inset-0 opacity-70"></span>
    <span class="relative flex items-center justify-between">
      <span
        class="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur"
      >
        <component :is="icon" class="h-5 w-5" :stroke-width="1.7" />
      </span>
      <span
        class="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-primary-100 ring-1 ring-white/15"
      >
        Most shopped
      </span>
    </span>
    <span class="relative mt-6 block">
      <span class="block font-display text-xl font-extrabold leading-tight sm:text-2xl">
        {{ category.name }}
      </span>
      <span class="mt-1.5 block text-xs text-slate-300">{{ countLabel }}</span>
      <span
        class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white transition duration-200 group-hover:gap-2.5"
      >
        Browse category
        <ArrowRight class="h-4 w-4" />
      </span>
    </span>
  </RouterLink>

  <!-- Compact row: used inside dense lists -->
  <RouterLink
    v-else-if="variant === 'compact'"
    :to="`/category/${category.slug}`"
    class="group flex min-w-0 items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-900/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-card hover:ring-primary-200"
  >
    <span
      class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-slate-900/5"
      :class="tint"
    >
      <component :is="icon" class="h-5 w-5" :stroke-width="1.7" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block truncate text-sm font-bold text-ink group-hover:text-primary-700">
        {{ category.name }}
      </span>
      <span class="block truncate text-[11px] text-slate-500">{{ countLabel }}</span>
    </span>
    <ChevronRight
      class="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-primary-600"
    />
  </RouterLink>

  <!-- Default tile -->
  <RouterLink
    v-else
    :to="`/category/${category.slug}`"
    class="group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] bg-white p-4 ring-1 ring-slate-900/[0.06] transition duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-card hover:ring-primary-200 sm:p-5"
  >
    <span
      class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-slate-900/5 transition duration-300 group-hover:scale-105"
      :class="tint"
    >
      <component :is="icon" class="h-5 w-5" :stroke-width="1.7" />
    </span>
    <span class="mt-4 block min-w-0">
      <span class="block truncate font-display text-[15px] font-bold text-ink group-hover:text-primary-700">
        {{ category.name }}
      </span>
      <span class="mt-1 block truncate text-xs text-slate-500">{{ countLabel }}</span>
    </span>
    <ArrowRight
      class="absolute right-4 top-5 h-4 w-4 -translate-x-2 text-primary-600 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    />
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowRight, ChevronRight } from 'lucide-vue-next'
import { categoryIcon, categoryTint } from '../../utils/categoryIcon'

const props = defineProps({
  category: { type: Object, required: true },
  variant: { type: String, default: 'tile' },
})

const icon = computed(() => categoryIcon(props.category.name))
const tint = computed(() => categoryTint(props.category.slug || props.category.name))
const countLabel = computed(() =>
  props.category.product_count ? `${props.category.product_count} products` : 'Explore products',
)
</script>
