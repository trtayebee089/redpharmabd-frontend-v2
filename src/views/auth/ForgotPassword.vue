<template>
  <AuthShell title="Reset password" subtitle="Use the recovery email connected to your RedPharma mobile number.">
    <form class="grid gap-4" @submit.prevent="submit">
      <label class="text-sm font-bold text-slate-700" for="reset-phone">Mobile number</label>
      <input id="reset-phone" v-model.trim="form.mobile" inputmode="tel" autocomplete="tel" required :disabled="step === 2" class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none disabled:text-slate-500 focus:ring-2 focus:ring-primary-500" />
      <template v-if="step === 2">
        <p class="rounded-2xl bg-primary-50 p-4 text-sm leading-6 text-primary-900">If this account has a recovery email, enter the 6-digit code sent to it.</p>
        <label class="text-sm font-bold text-slate-700" for="reset-code">Reset code</label>
        <input id="reset-code" v-model.trim="form.otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 tracking-[.35em] outline-none focus:ring-2 focus:ring-primary-500" />
        <label class="text-sm font-bold text-slate-700" for="reset-password">New password</label>
        <input id="reset-password" v-model="form.password" type="password" autocomplete="new-password" minlength="8" required class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
        <label class="text-sm font-bold text-slate-700" for="reset-confirmation">Confirm password</label>
        <input id="reset-confirmation" v-model="form.password_confirmation" type="password" autocomplete="new-password" minlength="8" required class="-mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
      </template>
      <ErrorState v-if="error" :message="error" />
      <button :disabled="loading || !valid" class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">{{ loading ? 'Please wait…' : step === 1 ? 'Send reset code' : 'Set new password' }}</button>
      <button v-if="step === 2" type="button" class="text-sm font-bold text-primary-700" :disabled="loading" @click="sendCode">Resend code</button>
    </form>
  </AuthShell>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from './partials/AuthShell.vue'
import ErrorState from '../../components/common/ErrorState.vue'
import { authService } from '../../services/authService'

const router = useRouter(), step = ref(1), loading = ref(false), error = ref('')
const form = reactive({ mobile: '', otp: '', password: '', password_confirmation: '' })
const valid = computed(() => /^(?:\+?88)?01[3-9]\d{8}$/.test(form.mobile) && (step.value === 1 || (/^\d{6}$/.test(form.otp) && form.password.length >= 8 && /[A-Za-z]/.test(form.password) && /\d/.test(form.password) && form.password === form.password_confirmation)))
async function sendCode() { loading.value = true; error.value = ''; try { await authService.forgotPassword({ mobile: form.mobile }); step.value = 2 } catch (exception) { error.value = exception.message } finally { loading.value = false } }
async function submit() { if (!valid.value) return; if (step.value === 1) return sendCode(); loading.value = true; error.value = ''; try { await authService.resetPassword(form); router.push('/login') } catch (exception) { error.value = exception.message } finally { loading.value = false } }
</script>
