<template>
  <div class="mx-auto max-w-4xl px-4 py-10">
    <article class="rounded-[2rem] bg-white p-6 shadow-soft md:p-10">
      <p class="text-sm font-bold uppercase text-primary-700">{{ eyebrow }}</p>
      <h1 class="mt-2 text-3xl font-black text-ink md:text-5xl">{{ title }}</h1>
      <div class="prose prose-slate mt-6 max-w-none text-slate-600">
        <slot />
      </div>
    </article>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  eyebrow: { type: String, default: 'RedPharma' },
})
</script>
