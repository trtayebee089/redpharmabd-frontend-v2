<template>
  <AuthShell title="Create your account" subtitle="Save delivery information and track every medicine order in one place.">
    <form class="grid gap-4" @submit.prevent="submit">
      <label class="text-sm font-bold text-slate-700">Full name <input v-model="form.name" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <label class="text-sm font-bold text-slate-700">Phone <input v-model="form.phone" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <label class="text-sm font-bold text-slate-700">Password <input v-model="form.password" type="password" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
      <ErrorState v-if="error" :message="error" />
      <button :disabled="auth.loading" class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white disabled:bg-slate-300">{{ auth.loading ? 'Creating...' : 'Register' }}</button>
      <RouterLink to="/login" class="text-center text-sm font-semibold text-primary-700">Already have an account?</RouterLink>
    </form>
  </AuthShell>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from './partials/AuthShell.vue'
import ErrorState from '../../components/common/ErrorState.vue'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const error = ref('')
const form = reactive({ name: '', phone: '', password: '' })

async function submit() {
  error.value = ''
  try {
    await auth.register(form)
    router.push('/account/profile')
  } catch (exception) {
    error.value = exception.message
  }
}
</script>
