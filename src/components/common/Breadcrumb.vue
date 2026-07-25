<template>
  <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
    <RouterLink class="hover:text-primary-700" to="/">Home</RouterLink>
    <span>/</span>
    <template v-for="item in items" :key="item.label">
      <RouterLink v-if="item.to" class="hover:text-primary-700" :to="item.to">{{ item.label }}</RouterLink>
      <span v-else class="font-semibold text-slate-800">{{ item.label }}</span>
      <span v-if="item !== items[items.length - 1]">/</span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
})
</script>
