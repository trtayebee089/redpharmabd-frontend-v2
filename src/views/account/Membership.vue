<template>
  <AccountShell>
    <div aria-live="polite">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div><p class="text-sm font-bold uppercase tracking-wider text-primary-700">Customer ecosystem</p><h1 class="text-3xl font-black text-ink">Membership Center</h1></div>
        <button class="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 disabled:opacity-50" :disabled="loading" @click="load">Refresh</button>
      </div>
      <div v-if="loading" class="mt-8 grid gap-4 md:grid-cols-3" role="status"><div v-for="n in 3" :key="n" class="h-32 animate-pulse rounded-3xl bg-slate-100" /></div>
      <div v-else-if="error" class="mt-6 rounded-2xl bg-red-50 p-4 text-red-700" role="alert">{{ error }}</div>
      <template v-else-if="membership">
        <section class="mt-6 overflow-hidden rounded-[2rem] p-6 text-white shadow-soft" :style="{ background: `linear-gradient(135deg, ${plan.color || '#0f766e'}, #0f172a)` }" aria-label="Membership card">
          <div class="flex flex-wrap justify-between gap-6"><div><p class="text-sm font-bold uppercase tracking-[.2em] text-white/70">RedPharma member</p><h2 class="mt-2 text-4xl font-black">{{ plan.name }}</h2><p class="mt-2 text-white/80">Status: {{ membership.status }}</p></div><div class="text-right"><p class="text-sm text-white/70">Member since</p><p class="font-bold">{{ date(membership.started_at) }}</p><p v-if="membership.expires_at" class="mt-2 text-sm text-white/70">Valid until {{ date(membership.expires_at) }}</p></div></div>
        </section>
        <section class="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Membership statistics">
          <article class="rounded-2xl bg-slate-50 p-5"><p class="text-sm text-slate-500">Current-year purchase</p><p class="mt-1 text-2xl font-black text-ink">৳{{ money(statistics.current_year_purchase) }}</p></article>
          <article class="rounded-2xl bg-slate-50 p-5"><p class="text-sm text-slate-500">Lifetime purchase</p><p class="mt-1 text-2xl font-black text-ink">৳{{ money(statistics.lifetime_purchase) }}</p></article>
          <article class="rounded-2xl bg-slate-50 p-5"><p class="text-sm text-slate-500">Reward balance</p><p class="mt-1 text-2xl font-black text-ink">{{ money(statistics.reward_balance) }}</p></article>
        </section>
        <section class="mt-8 rounded-3xl border border-slate-100 p-5">
          <div class="flex justify-between gap-4"><div><h2 class="text-xl font-black text-ink">Upgrade progress</h2><p class="text-sm text-slate-500">{{ progress.next ? `৳${money(progress.remaining_purchase)} remaining for ${progress.next.name}` : 'Highest eligible tier reached' }}</p></div><strong class="text-primary-800">{{ progress.percentage }}%</strong></div>
          <div class="mt-4 h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" :aria-valuenow="progress.percentage" aria-valuemin="0" aria-valuemax="100"><div class="h-full rounded-full bg-primary-700 transition-all" :style="{ width: `${progress.percentage}%` }" /></div>
          <p v-if="progress.fee_required" class="mt-3 text-sm text-amber-700">Red also requires a successful annual membership fee payment.</p>
          <button v-if="progress.fee_required && statistics.current_year_purchase >= Number(progress.next?.minimum_annual_purchase || 0)" class="mt-4 rounded-xl bg-primary-800 px-4 py-2 font-bold text-white disabled:opacity-50" :disabled="renewing" @click="renew">{{ renewing ? 'Creating request…' : 'Request renewal' }}</button>
        </section>
        <section class="mt-8"><h2 class="text-xl font-black text-ink">Your benefits</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><article v-for="benefit in enabledBenefits" :key="benefit.code" class="rounded-2xl border border-slate-100 p-4"><p class="font-bold text-ink">{{ benefit.name }}</p><p class="text-sm text-slate-500">{{ benefitText(benefit) }}</p></article></div></section>
        <section class="mt-8"><h2 class="text-xl font-black text-ink">Membership history</h2><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[560px] text-left text-sm"><thead class="text-slate-500"><tr><th class="p-3">Date</th><th class="p-3">Event</th><th class="p-3">Tier</th><th class="p-3">Reason</th></tr></thead><tbody><tr v-for="item in history" :key="item.id" class="border-t border-slate-100"><td class="p-3">{{ date(item.occurred_at) }}</td><td class="p-3 capitalize">{{ item.event?.replace('_', ' ') }}</td><td class="p-3">{{ item.new_plan?.name || '—' }}</td><td class="p-3">{{ item.reason }}</td></tr><tr v-if="!history.length"><td colspan="4" class="p-4 text-slate-500">No membership changes yet.</td></tr></tbody></table></div></section>
      </template>
    </div>
  </AccountShell>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AccountShell from './partials/AccountShell.vue'
import { membershipService } from '../../services/membershipService'
const loading=ref(true),renewing=ref(false),error=ref(''),data=ref(null),history=ref([])
const membership=computed(()=>data.value?.membership),plan=computed(()=>membership.value?.plan||{}),statistics=computed(()=>data.value?.statistics||{}),progress=computed(()=>data.value?.progress||{percentage:0}),enabledBenefits=computed(()=>Object.values(data.value?.benefits||{}).filter(x=>x.enabled))
const money=v=>Number(v||0).toLocaleString('en-BD',{maximumFractionDigits:2}); const date=v=>v?new Intl.DateTimeFormat('en-BD',{dateStyle:'medium'}).format(new Date(v)):'—'
function benefitText(b){if(b.code==='reward_points')return `${b.value} point${b.value===1?'':'s'} per ${data.value?.benefits?.reward_spend?.value||100} BDT`;if(b.unit==='percent')return `${b.value}%`;if(b.unit==='BDT')return Number(b.value)===0?'Free':`৳${money(b.value)}`;if(typeof b.value==='boolean')return b.value?'Included':'Not included';return String(b.value||'Included')}
async function load(){loading.value=true;error.value='';try{[data.value,history.value]=await Promise.all([membershipService.current(),membershipService.history().then(x=>x?.items||x||[])])}catch(e){error.value=e.message||'Unable to load membership.'}finally{loading.value=false}}
async function renew(){renewing.value=true;try{await membershipService.renew();await load()}catch(e){error.value=e.message||'Unable to create renewal request.'}finally{renewing.value=false}}
onMounted(load)
</script>
