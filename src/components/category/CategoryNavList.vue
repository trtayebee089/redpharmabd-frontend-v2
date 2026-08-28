<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <nav class="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto px-2 pb-2" aria-label="Categories">
      <template v-if="loading">
        <div v-for="n in 8" :key="n" class="flex items-center gap-3 px-2 py-2.5">
          <span class="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-100"></span>
          <span class="h-3 flex-1 animate-pulse rounded-full bg-slate-100"></span>
        </div>
      </template>

      <template v-else>
        <RouterLink
          v-for="category in filtered"
          :key="category.id"
          :to="`/category/${category.slug}`"
          class="group relative flex items-center gap-3 rounded-xl px-2 py-2.5 transition duration-200 hover:bg-slate-50 [&.router-link-active]:bg-primary-50"
          @click="$emit('navigate')"
        >
          <span
            class="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-r-full bg-primary-600 transition-all duration-300 ease-premium group-[.router-link-active]:h-6"
          ></span>
          <span
            class="grid h-9 w-9 overflow-hidden shrink-0 place-items-center rounded-lg bg-gradient-to-br ring-1 ring-slate-900/5 transition duration-200 group-hover:scale-105"
            :class="tintFor(category)"
          >
            <img :src="category.image" class="h-9 w-9" :stroke-width="1.8" />
          </span>
          <span class="min-w-0 flex-1">
            <span
              class="block truncate text-[13px] font-semibold text-slate-700 transition group-hover:text-ink group-[.router-link-active]:text-primary-800"
            >
              {{ category.name }}
            </span>
          </span>
          <span
            v-if="category.product_count"
            class="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 transition group-hover:bg-white group-[.router-link-active]:bg-white group-[.router-link-active]:text-primary-700"
          >
            {{ category.product_count }}
          </span>
          <ChevronRight
            v-else
            class="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-primary-600"
          />
        </RouterLink>

        <p v-if="!filtered.length" class="px-3 py-8 text-center text-sm text-slate-500">No category matches “{{ term }}”.</p>
      </template>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, ChevronRight, FileText, Search } from 'lucide-vue-next'
import { categoryIcon, categoryTint } from '../../utils/categoryIcon'

const props = defineProps({
  categories: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

defineEmits(['navigate'])

const term = ref('')

const filtered = computed(() => {
  const needle = term.value.trim().toLowerCase()
  if (!needle) return props.categories
  return props.categories.filter((category) =>
    String(category.name || '').toLowerCase().includes(needle),
  )
})

const iconFor = (name) => categoryIcon(name)
const tintFor = (category) => categoryTint(category.slug || category.name)
</script>
