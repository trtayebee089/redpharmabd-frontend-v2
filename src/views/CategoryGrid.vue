<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <Breadcrumb :items="[{ label: 'Categories' }]" />
    <div class="mt-5 rounded-[2rem] bg-gradient-to-br from-primary-50 to-sky-50 p-6 md:p-10">
      <h1 class="text-3xl font-black text-ink md:text-5xl">Shop by category</h1>
      <p class="mt-3 max-w-2xl text-slate-600">Find medicines, wellness products, and daily healthcare essentials faster.</p>
    </div>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CategoryCard v-for="category in categoryStore.categories" :key="category.id" :category="category" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Breadcrumb from '../components/common/Breadcrumb.vue'
import CategoryCard from '../components/category/CategoryCard.vue'
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.fetch())
</script>
