<template>
  <aside class="space-y-5 rounded-3xl bg-white p-5 shadow-soft">
    <div>
      <h3 class="text-lg font-bold text-ink">Filters</h3>
      <p class="text-sm text-slate-500">Refine your medicine search</p>
    </div>
    <label class="block text-sm font-semibold text-slate-700">
      Price range
      <select class="mt-2 w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" v-model="local.price">
        <option value="">Any price</option>
        <option value="0-100">Under ৳100</option>
        <option value="100-500">৳100 to ৳500</option>
        <option value="500-999999">৳500+</option>
      </select>
    </label>
    <label class="flex items-center gap-3 text-sm font-semibold text-slate-700">
      <input v-model="local.in_stock" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
      In stock only
    </label>
    <label class="flex items-center gap-3 text-sm font-semibold text-slate-700">
      <input v-model="local.discounted" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
      Discounted products
    </label>
    <label class="flex items-center gap-3 text-sm font-semibold text-slate-700">
      <input v-model="local.prescription_required" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
      Prescription required
    </label>
    <button type="button" class="w-full rounded-full bg-primary-600 px-4 py-3 text-sm font-bold text-white hover:bg-primary-700" @click="$emit('apply', local)">
      Apply filters
    </button>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'

const local = reactive({
  price: '',
  in_stock: false,
  discounted: false,
  prescription_required: false,
})

defineEmits(['apply'])
</script>
