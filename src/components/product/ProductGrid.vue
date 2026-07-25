<template>
  <div
    v-if="loading"
    class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-4 2xl:grid-cols-6"
  >
    <LoadingSkeleton v-for="item in skeletons" :key="item" />
  </div>
  <EmptyState
    v-else-if="!products.length"
    title="No products found"
    message="Try another category or search term."
  />
  <div
    v-else
    class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-4 2xl:grid-cols-6"
  >
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import LoadingSkeleton from '../common/LoadingSkeleton.vue'
import EmptyState from '../common/EmptyState.vue'

defineProps({
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  skeletons: { type: Number, default: 10 },
})
</script>
