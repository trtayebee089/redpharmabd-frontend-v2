<template>
  <div class="mx-auto grid min-h-[70vh] max-w-7xl place-items-center px-4 py-10">
    <div class="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-lift md:grid-cols-[0.9fr_1.1fr]">
      <section class="bg-gradient-to-br from-primary-900 to-teal-700 p-8 text-white md:p-10">
        <p class="text-sm font-bold uppercase text-primary-100">RedPharma account</p>
        <h1 class="mt-4 text-3xl font-black md:text-5xl">{{ title }}</h1>
        <p class="mt-4 leading-7 text-teal-50">{{ subtitle }}</p>
      </section>
      <section class="p-6 md:p-10">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>
