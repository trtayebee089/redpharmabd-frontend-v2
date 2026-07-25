<template>
  <AuthShell title="Reset password" subtitle="Enter your phone or email and follow the recovery instructions.">
    <form class="grid gap-4" @submit.prevent="submit">
      <label class="text-sm font-bold text-slate-700">Phone or email <input v-model="phone" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <button class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white">Send reset instructions</button>
    </form>
  </AuthShell>
</template>

<script setup>
import { ref } from 'vue'
import AuthShell from './partials/AuthShell.vue'
import { useUiStore } from '../../stores/uiStore'

const phone = ref('')
const ui = useUiStore()
function submit() {
  ui.toast('Reset instructions requested.', 'info')
}
</script>
