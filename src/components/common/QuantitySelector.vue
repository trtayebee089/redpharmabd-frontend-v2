<template>
  <div
    class="items-center overflow-hidden rounded-lg bg-accent-50 text-accent-900 ring-1 ring-accent-200"
    :class="block ? 'flex h-9 w-full justify-between' : 'inline-flex h-9'"
  >
    <button
      class="grid place-items-center text-accent-800 transition hover:bg-accent-100 active:scale-90"
      :class="block ? 'h-9 w-11' : 'h-9 w-9'"
      type="button"
      aria-label="Decrease quantity"
      @click="$emit('update:modelValue', Math.max(0, modelValue - 1))"
    >
      <Minus class="h-4 w-4" :stroke-width="2.6" />
    </button>
    <span class="min-w-8 text-center text-sm font-bold tabular-nums">{{ modelValue }}</span>
    <button
      class="grid place-items-center text-accent-800 transition hover:bg-accent-100 active:scale-90"
      :class="block ? 'h-9 w-11' : 'h-9 w-9'"
      type="button"
      aria-label="Increase quantity"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <Plus class="h-4 w-4" :stroke-width="2.6" />
    </button>
  </div>
</template>

<script setup>
import { Minus, Plus } from 'lucide-vue-next'

defineProps({
  modelValue: { type: Number, default: 1 },
  block: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>
