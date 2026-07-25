<template>
  <div class="mx-auto max-w-3xl px-4 py-10">
    <div class="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
      <h1 class="text-3xl font-black text-ink">{{ title }}</h1>
      <p class="mt-2 text-slate-500">{{ subtitle }}</p>
      <form class="mt-6 grid gap-4" @submit.prevent="$emit('submit', form)">
        <label v-for="field in fields" :key="field.name" class="text-sm font-bold text-slate-700">
          {{ field.label }}
          <textarea
            v-if="field.type === 'textarea'"
            v-model="form[field.name]"
            :required="field.required"
            rows="4"
            class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
          ></textarea>
          <input
            v-else
            v-model="form[field.name]"
            :type="field.type || 'text'"
            :required="field.required"
            class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
          />
        </label>
        <button class="rounded-full bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700">{{ button }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  button: { type: String, default: 'Submit' },
  fields: { type: Array, default: () => [] },
})

defineEmits(['submit'])
const form = reactive(Object.fromEntries(props.fields.map((field) => [field.name, ''])))
</script>
