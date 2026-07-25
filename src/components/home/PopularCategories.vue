<template>
  <section>
    <SectionHeader
      eyebrow="Browse"
      title="Popular categories"
      subtitle="Jump straight to the shelf you need — organised by health need, not by drug class."
      to="/categories"
    />
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <RouterLink
        v-for="(category, index) in categories"
        :key="category.id"
        :to="`/category/${category.slug}`"
        class="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-slate-900/[0.07] transition duration-300 ease-premium hover:-translate-y-1 hover:shadow-card hover:ring-primary-200 sm:flex-col sm:items-start sm:p-4"
      >
        <span
          class="pointer-events-none absolute inset-x-0 -bottom-10 h-20 bg-gradient-to-t opacity-0 transition duration-500 group-hover:opacity-100"
          :class="tone(index)"
        ></span>
        <span
          class="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-slate-900/5 transition duration-300 group-hover:scale-105"
          :class="tint(category)"
        >
          <component :is="icon(category.name)" class="h-5 w-5" :stroke-width="1.8" />
        </span>
        <span class="relative min-w-0 sm:mt-3">
          <span class="block truncate text-[13px] font-bold text-ink group-hover:text-primary-700">
            {{ category.name }}
          </span>
          <span class="mt-0.5 block truncate text-[11px] text-slate-500">
            {{ category.product_count ? `${category.product_count} items` : 'Explore' }}
          </span>
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '../common/SectionHeader.vue'
import { categoryIcon, categoryTint } from '../../utils/categoryIcon'

defineProps({
  categories: { type: Array, default: () => [] },
})

const TONES = [
  'from-primary-100/70',
  'from-accent-100/70',
  'from-sky-100/70',
  'from-amber-100/70',
  'from-violet-100/70',
  'from-rose-100/70',
]

const icon = (name) => categoryIcon(name)
const tint = (category) => categoryTint(category.slug || category.name)
const tone = (index) => TONES[index % TONES.length]
</script>
