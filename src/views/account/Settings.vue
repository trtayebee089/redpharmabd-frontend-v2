<template>
  <AccountShell>
    <h1 class="text-3xl font-black text-ink">Settings</h1>
    <div class="mt-6 space-y-4">
      <label class="flex items-center justify-between rounded-2xl bg-slate-50 p-4 font-bold text-slate-700">
        Order updates
        <input type="checkbox" checked class="h-5 w-5 rounded text-primary-600 focus:ring-primary-500" />
      </label>
      <button class="rounded-full bg-red-50 px-5 py-3 font-bold text-red-700" @click="auth.logout()">Logout</button>
    </div>
  </AccountShell>
</template>

<script setup>
import AccountShell from './partials/AccountShell.vue'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
</script>
