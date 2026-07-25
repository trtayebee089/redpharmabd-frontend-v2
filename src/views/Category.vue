<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <Breadcrumb :items="[{ label: 'Categories', to: '/categories' }, { label: title }]" />
    <div class="mt-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-ink">{{ title }}</h1>
        <p class="mt-1 text-sm text-slate-500">{{ meta.total || products.length }} products found</p>
      </div>
      <div class="flex items-center gap-3">
        <button type="button" class="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm md:hidden" @click="filterOpen = true">Filters</button>
        <SortDropdown v-model="sort" />
      </div>
    </div>
    <div class="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
      <div class="hidden lg:block">
        <FilterPanel @apply="applyFilters" />
      </div>
      <ProductGrid :products="products" :loading="loading" />
    </div>
    <div v-if="meta.current_page < meta.last_page" class="mt-8 text-center">
      <button type="button" class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white" @click="loadMore">Load more</button>
    </div>
    <Teleport to="body">
      <div v-if="filterOpen" class="fixed inset-0 z-50 md:hidden">
        <button class="absolute inset-0 bg-ink/40" type="button" @click="filterOpen = false"></button>
        <div class="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-4">
          <FilterPanel @apply="applyMobileFilters" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '../components/common/Breadcrumb.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import FilterPanel from '../components/category/FilterPanel.vue'
import SortDropdown from '../components/category/SortDropdown.vue'
import { productService } from '../services/productService'

const route = useRoute()
const products = ref([])
const meta = ref({})
const loading = ref(true)
const sort = ref('popular')
const filters = ref({})
const filterOpen = ref(false)
const title = computed(() => String(route.params.slug || '').replaceAll('-', ' ') || 'Category')

async function fetchProducts(page = 1, append = false) {
  loading.value = !append
  const response = await productService.list({ category: route.params.slug, sort: sort.value, page, per_page: 24, ...filters.value })
  products.value = append ? [...products.value, ...response.data] : response.data
  meta.value = response.meta || {}
  loading.value = false
}

function applyFilters(next) {
  filters.value = { ...next }
  fetchProducts()
}

function applyMobileFilters(next) {
  applyFilters(next)
  filterOpen.value = false
}

function loadMore() {
  fetchProducts((meta.value.current_page || 1) + 1, true)
}

watch(sort, () => fetchProducts())
watch(() => route.params.slug, () => fetchProducts())
onMounted(() => fetchProducts())
</script>
