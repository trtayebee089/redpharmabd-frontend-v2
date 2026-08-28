<template>
  <AuthShell title="Welcome back" subtitle="Log in to manage orders and saved details.">
    <form class="grid gap-4" @submit.prevent="submit">
      <label class="text-sm font-bold text-slate-700" for="login-identifier">Phone or email <input id="login-identifier" v-model.trim="form.identifier" autocomplete="username" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <label class="text-sm font-bold text-slate-700" for="login-password">Password <input id="login-password" v-model="form.password" type="password" autocomplete="current-password" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <ErrorState v-if="error" :message="error" role="alert" />
      <button :disabled="auth.loading || !form.identifier || !form.password" :aria-busy="auth.loading" class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white disabled:bg-slate-300">{{ auth.loading ? 'Logging in…' : 'Login' }}</button>
      <div class="flex justify-between text-sm font-semibold">
        <RouterLink to="/forgot-password" class="text-primary-700">Forgot password?</RouterLink>
        <RouterLink to="/register" class="text-primary-700">Create account</RouterLink>
      </div>
    </form>
  </AuthShell>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from './partials/AuthShell.vue'
import ErrorState from '../../components/common/ErrorState.vue'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const error = ref('')
const form = reactive({ identifier: '', password: '', device_name: 'redpharma-web-v2' })

async function submit() {
  error.value = ''
  try {
    await auth.login(form)
    router.push(route.query.redirect || '/account/profile')
  } catch (exception) {
    error.value = exception.message
  }
}
</script>
