<template>
  <section class="rounded-3xl bg-white p-6 shadow-soft">
    <h2 class="text-xl font-bold text-ink">Medicine information</h2>
    <div class="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
      <div>
        <p class="font-semibold text-slate-900">Generic name</p>
        <p>{{ product.generic_name || 'Not specified' }}</p>
      </div>
      <div>
        <p class="font-semibold text-slate-900">Manufacturer</p>
        <p>{{ product.manufacturer || 'Not specified' }}</p>
      </div>
      <div>
        <p class="font-semibold text-slate-900">Strength / size</p>
        <p>{{ product.strength || product.unit || 'Not specified' }}</p>
      </div>
      <div>
        <p class="font-semibold text-slate-900">Usage info</p>
        <p>{{ product.usage || 'Use as directed by a registered physician.' }}</p>
      </div>
    </div>
    <p class="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
      Always follow your physician's advice before using any medicine. Product information is for reference only.
    </p>
  </section>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true },
})
</script>
