<template>
  <!-- Desktop: floating, sticky, independently scrolled navigation panel -->
  <aside class="hidden xl:block">
    <div
      class="sticky top-[136px] flex max-h-[calc(100vh)] flex-col overflow-hidden bg-white shadow-card ring-1 ring-slate-900/[0.06] border border-[#eee]"
    >
      <div class="flex items-center justify-between gap-3 border-b border-slate-900/[0.06] px-4 py-4">
        <div class="flex items-center gap-2.5">
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-primary-50 text-primary-700">
            <LayoutGrid class="h-[18px] w-[18px]" :stroke-width="1.9" />
          </span>
          <div>
            <p class="font-display text-sm font-extrabold leading-none text-ink">Categories</p>
            <p class="mt-1.5 text-[11px] leading-none text-slate-400">Shop by health need</p>
          </div>
        </div>
        <span
          v-if="categories.length"
          class="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500"
        >
          {{ categories.length }}
        </span>
      </div>

      <CategoryNavList :categories="categories" :loading="loading" />
    </div>
  </aside>

  <!-- Mobile / tablet: slide-out drawer.
       Backdrop and panel are sibling transitions — nesting them leaves the
       wrapper stuck in the DOM and blocks every click on the page. -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <button
        v-if="open"
        type="button"
        class="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-[2px] xl:hidden"
        aria-label="Close categories"
        @click="$emit('close')"
      ></button>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-premium"
      enter-from-class="-translate-x-full"
      leave-active-class="transition-transform duration-200 ease-premium"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="open"
        class="fixed inset-y-0 left-0 z-[61] flex w-[86%] max-w-[340px] flex-col bg-white shadow-lift xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Categories"
      >
        <div class="flex items-center justify-between gap-3 border-b border-slate-900/[0.06] px-4 py-4">
          <div class="flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-xl bg-primary-50 text-primary-700">
              <LayoutGrid class="h-[18px] w-[18px]" :stroke-width="1.9" />
            </span>
            <div>
              <p class="font-display text-sm font-extrabold leading-none text-ink">Categories</p>
              <p class="mt-1.5 text-[11px] leading-none text-slate-400">Shop by health need</p>
            </div>
          </div>
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
            aria-label="Close categories"
            @click="$emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <CategoryNavList :categories="categories" :loading="loading" @navigate="$emit('close')" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { LayoutGrid, X } from 'lucide-vue-next'
import CategoryNavList from './CategoryNavList.vue'

const props = defineProps({
  categories: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

function lockScroll(locked) {
  document.body.style.overflow = locked ? 'hidden' : ''
}

watch(
  () => props.open,
  (isOpen) => {
    lockScroll(isOpen)
    if (isOpen) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)
  },
)

onBeforeUnmount(() => {
  lockScroll(false)
  document.removeEventListener('keydown', onKeydown)
})
</script>
