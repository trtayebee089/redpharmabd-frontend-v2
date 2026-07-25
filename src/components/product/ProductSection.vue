<template>
  <section>
    <SectionHeader
      :eyebrow="eyebrow"
      :title="title"
      :subtitle="subtitle"
      :to="to"
      :link-label="linkLabel"
      :tone="tone"
    />
    <ProductRail
      v-if="variant === 'rail'"
      :products="products"
      :loading="loading"
      :ranked="ranked"
    />
    <ProductGrid v-else :products="products" :loading="loading" :skeletons="skeletons" />
  </section>
</template>

<script setup>
import ProductGrid from './ProductGrid.vue'
import ProductRail from './ProductRail.vue'
import SectionHeader from '../common/SectionHeader.vue'

defineProps({
  title: { type: String, required: true },
  eyebrow: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  to: { type: String, default: '' },
  linkLabel: { type: String, default: 'View all' },
  tone: { type: String, default: 'default' },
  variant: { type: String, default: 'grid' },
  ranked: { type: Boolean, default: false },
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  skeletons: { type: Number, default: 10 },
})
</script>
