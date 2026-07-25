<template>
  <AccountShell>
    <h1 class="text-3xl font-black text-ink">Profile</h1>
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <label class="text-sm font-bold text-slate-700">Name <input v-model="user.name" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <label class="text-sm font-bold text-slate-700">Phone <input v-model="user.phone" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <label class="md:col-span-2 text-sm font-bold text-slate-700">Default address <textarea v-model="user.address" rows="3" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"></textarea></label>
    </div>
    <button class="mt-5 rounded-full bg-primary-600 px-6 py-3 font-bold text-white" @click="ui.toast('Profile saved locally until backend profile update is confirmed.', 'info')">Save changes</button>
  </AccountShell>
</template>

<script setup>
import { reactive } from 'vue'
import AccountShell from './partials/AccountShell.vue'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const auth = useAuthStore()
const ui = useUiStore()
const user = reactive({ name: auth.user?.name || '', phone: auth.user?.phone || auth.user?.phone_number || '', address: auth.user?.address || '' })
</script>
