<template>
  <AuthShell title="Create your account" subtitle="Save delivery information and track every medicine order in one place.">
    <form class="grid gap-4" novalidate @submit.prevent="submit">
      <label class="text-sm font-bold text-slate-700" for="register-name">Full name</label>
      <input id="register-name" v-model.trim="form.name" autocomplete="name" required :aria-invalid="Boolean(errors.name)" class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
      <p v-if="errors.name" class="-mt-3 text-sm text-red-700">{{ errors.name[0] }}</p>

      <label class="text-sm font-bold text-slate-700" for="register-phone">Mobile number</label>
      <input id="register-phone" v-model.trim="form.phone_number" inputmode="tel" autocomplete="tel" placeholder="01XXXXXXXXX" required :aria-invalid="Boolean(errors.phone_number)" class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
      <p v-if="errors.phone_number" class="-mt-3 text-sm text-red-700">{{ errors.phone_number[0] }}</p>

      <label class="text-sm font-bold text-slate-700" for="register-email">Email <span class="font-normal text-slate-500">(optional)</span></label>
      <input id="register-email" v-model.trim="form.email" type="email" autocomplete="email" :aria-invalid="Boolean(errors.email)" class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
      <p v-if="errors.email" class="-mt-3 text-sm text-red-700">{{ errors.email[0] }}</p>

      <label class="text-sm font-bold text-slate-700" for="register-password">Password</label>
      <input id="register-password" v-model="form.password" type="password" autocomplete="new-password" minlength="8" required :aria-invalid="Boolean(errors.password)" class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
      <p class="-mt-3 text-xs text-slate-500">Use at least 8 characters with letters and numbers.</p>
      <p v-if="errors.password" class="-mt-3 text-sm text-red-700">{{ errors.password[0] }}</p>

      <label class="text-sm font-bold text-slate-700" for="register-confirmation">Confirm password</label>
      <input id="register-confirmation" v-model="form.password_confirmation" type="password" autocomplete="new-password" minlength="8" required class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
      <ErrorState v-if="error" :message="error" role="alert" />
      <button :disabled="auth.loading || !canSubmit" :aria-busy="auth.loading" class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
        {{ auth.loading ? 'Creating account…' : 'Create account' }}
      </button>
      <RouterLink to="/login" class="text-center text-sm font-semibold text-primary-700">Already have an account?</RouterLink>
    </form>
  </AuthShell>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from './partials/AuthShell.vue'
import ErrorState from '../../components/common/ErrorState.vue'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const error = ref('')
const errors = reactive({})
const form = reactive({ name: '', phone_number: '', email: '', password: '', password_confirmation: '', device_name: 'redpharma-web-v2' })
const canSubmit = computed(() => form.name.length >= 2 && /^(?:\+?88)?01[3-9]\d{8}$/.test(form.phone_number) && form.password.length >= 8 && /[A-Za-z]/.test(form.password) && /\d/.test(form.password) && form.password === form.password_confirmation)

async function submit() {
  if (!canSubmit.value || auth.loading) return
  error.value = ''
  Object.keys(errors).forEach((key) => delete errors[key])
  try {
    await auth.register({ ...form, email: form.email || null })
    router.push('/account/profile')
  } catch (exception) {
    Object.assign(errors, exception.errors || {})
    error.value = exception.message || 'We could not create your account.'
  }
}
</script>
