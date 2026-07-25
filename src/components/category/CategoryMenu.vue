<template>
  <div class="rail -mx-4 gap-2 px-4 py-1 sm:mx-0 sm:px-0">
    <RouterLink
      to="/categories"
      class="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-ink-soft"
    >
      <LayoutGrid class="h-4 w-4" :stroke-width="2" />
      All
    </RouterLink>
    <RouterLink
      v-for="category in categories"
      :key="category.id"
      :to="`/category/${category.slug}`"
      class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-900/[0.06] transition duration-200 hover:-translate-y-0.5 hover:text-primary-800 hover:ring-primary-200"
      active-class="bg-primary-50 text-primary-800 ring-primary-200"
    >
      <component :is="iconFor(category.name)" class="h-4 w-4 text-primary-600" :stroke-width="1.9" />
      {{ category.name }}
    </RouterLink>
  </div>
</template>

<script setup>
import { LayoutGrid } from 'lucide-vue-next'
import { categoryIcon } from '../../utils/categoryIcon'

defineProps({
  categories: { type: Array, default: () => [] },
})

const iconFor = (name) => categoryIcon(name)
</script>
