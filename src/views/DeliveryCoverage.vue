<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <section class="rounded-[2rem] bg-gradient-to-br from-primary-50 to-sky-50 p-8 md:p-12">
      <h1 class="text-3xl font-black text-ink md:text-5xl">Delivery coverage</h1>
      <p class="mt-3 max-w-2xl text-slate-600">Check whether fast delivery, regular delivery, or request-order support is available in your area.</p>
    </section>
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div v-for="area in areas" :key="area.name" class="rounded-3xl bg-white p-6 shadow-soft">
        <p class="text-xl font-black text-ink">{{ area.name }}</p>
        <p class="mt-2 text-sm text-slate-500">{{ area.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const areas = [
  { name: 'Rajshahi city', text: 'Fast delivery options for most available medicines.' },
  { name: 'Nearby zones', text: 'Regular delivery after order confirmation.' },
  { name: 'Outside coverage', text: 'Request order support may still be available.' },
]
</script>
