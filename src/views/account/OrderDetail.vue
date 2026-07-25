<template>
  <AccountShell>
    <h1 class="text-3xl font-black text-ink">Order #{{ $route.params.id }}</h1>
    <div class="mt-6 rounded-2xl bg-primary-50 p-5 text-sm text-slate-700">
      Order details will show live item and status information when the backend order detail endpoint is available.
    </div>
  </AccountShell>
</template>

<script setup>
import AccountShell from './partials/AccountShell.vue'
</script>
