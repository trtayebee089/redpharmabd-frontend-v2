<template>
  <section class="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white sm:px-10">
    <span class="aurora pointer-events-none absolute inset-0 opacity-90"></span>
    <span class="grid-lines pointer-events-none absolute inset-0 opacity-50"></span>

    <div class="relative grid gap-9 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-300">
          Prescription support
        </p>
        <h2
          class="mt-4 max-w-md font-display text-[26px] font-extrabold leading-[1.12] sm:text-[34px]"
        >
          Have a prescription? We'll handle the rest.
        </h2>
        <p class="mt-4 max-w-md text-sm leading-7 text-slate-300">
          Upload your prescription or simply describe what you need. Our team confirms availability,
          pricing and the next step — no account required to ask.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <RouterLink
            to="/request-order"
            class="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-ink transition duration-200 hover:bg-primary-50 active:scale-[0.98]"
          >
            <Upload class="h-4 w-4 text-primary-600" />
            Upload prescription
          </RouterLink>
          <RouterLink
            to="/help-center"
            class="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-white/10"
          >
            How it works
          </RouterLink>
        </div>
      </div>

      <ol class="grid gap-3 sm:grid-cols-3">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10 backdrop-blur-sm"
        >
          <span
            class="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15"
          >
            <component :is="step.icon" class="h-5 w-5" :stroke-width="1.8" />
          </span>
          <p class="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-300">
            Step {{ index + 1 }}
          </p>
          <p class="mt-1.5 text-sm font-bold">{{ step.title }}</p>
          <p class="mt-1.5 text-xs leading-5 text-slate-400">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { FileText, MessageSquareText, PackageCheck, Upload } from 'lucide-vue-next'

const steps = [
  { title: 'Share details', text: 'Upload a prescription or describe the item.', icon: FileText },
  { title: 'We confirm', text: 'Our team checks availability and price.', icon: MessageSquareText },
  { title: 'You receive it', text: 'Approve, then we dispatch to your area.', icon: PackageCheck },
]
</script>
