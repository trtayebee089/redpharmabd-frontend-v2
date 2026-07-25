<template>
  <div class="rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-100">
    <p class="font-bold">{{ title }}</p>
    <p class="mt-1 text-sm">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Could not load content' },
  message: { type: String, default: 'Please refresh or try again in a moment.' },
})
</script>
