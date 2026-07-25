<template>
  <label class="flex items-center gap-2 text-sm font-semibold text-slate-600">
    Sort
    <select
      :value="modelValue"
      class="rounded-full border-0 bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-primary-500"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="popular">Popular</option>
      <option value="newest">Newest</option>
      <option value="price_asc">Price low to high</option>
      <option value="price_desc">Price high to low</option>
    </select>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: 'popular' },
})
defineEmits(['update:modelValue'])
</script>
