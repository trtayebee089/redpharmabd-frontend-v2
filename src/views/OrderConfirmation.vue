<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <div class="rounded-[2rem] bg-white p-8 text-center shadow-soft">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-700">
        <CheckCircle class="h-8 w-8" />
      </div>
      <h1 class="mt-5 text-3xl font-black text-ink">Order placed successfully</h1>
      <p class="mt-2 text-slate-500">Your order reference is <strong>#{{ $route.params.id }}</strong>. We will contact you if prescription verification is needed.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <RouterLink to="/track-order" class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white">Track order</RouterLink>
        <RouterLink to="/" class="rounded-full bg-slate-100 px-6 py-3 font-bold text-slate-700">Continue shopping</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle } from 'lucide-vue-next'
</script>
