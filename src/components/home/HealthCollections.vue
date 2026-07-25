<template>
  <section>
    <SectionHeader
      eyebrow="Collections"
      title="Shop by health concern"
      subtitle="Curated shelves for the things people restock most often."
      to="/categories"
    />
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <RouterLink
        v-for="(collection, index) in collections"
        :key="collection.id"
        :to="`/category/${collection.slug}`"
        class="group relative flex min-h-[132px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-5 ring-1 ring-slate-900/[0.07] transition duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-card"
        :class="tone(index)"
      >
        <component
          :is="icon(collection.name)"
          class="pointer-events-none absolute -right-5 -top-5 h-28 w-28 text-ink opacity-[0.06] transition duration-500 ease-premium group-hover:rotate-6 group-hover:scale-110"
          :stroke-width="1.2"
        />
        <span class="relative block font-display text-[17px] font-extrabold leading-tight text-ink">
          {{ collection.name }}
        </span>
        <span class="relative mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          {{ collection.product_count ? `${collection.product_count} products` : 'Explore' }}
          <ArrowRight class="h-3.5 w-3.5 transition duration-200 group-hover:translate-x-1" />
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
import SectionHeader from '../common/SectionHeader.vue'
import { categoryIcon } from '../../utils/categoryIcon'

defineProps({
  collections: { type: Array, default: () => [] },
})

const TONES = [
  'from-primary-50 to-white',
  'from-accent-50 to-white',
  'from-sky-50 to-white',
  'from-amber-50 to-white',
  'from-violet-50 to-white',
  'from-rose-50 to-white',
  'from-lime-50 to-white',
  'from-slate-100 to-white',
]

const icon = (name) => categoryIcon(name)
const tone = (index) => TONES[index % TONES.length]
</script>
