<template>
  <section class="grid gap-6 xl:grid-cols-[330px_minmax(0,1fr)] items-start">
    <!-- Desktop Sidebar -->
    <CategorySidebar
      :categories="categories"
      :loading="categoryLoading"
      :open="drawerOpen"
      @close="emit('close-sidebar')"
    />

    <div
      class="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-accent-50 to-primary-50 shadow-lg"
    >
      <!-- Decorative Background -->
      <span
        class="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-50 via-white to-primary-50"
      ></span>

      <span
        class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl"
      ></span>

      <span
        class="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl"
      ></span>

      <!-- Hero Content -->
      <div
        class="relative grid min-h-[500px] items-center gap-10 px-8 py-10 lg:grid-cols-[1fr_500px] lg:px-12"
      >
        <!-- Left Content -->
        <div class="animate-fade-up">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-primary-100"
          >
            <ShieldCheck class="h-4 w-4 text-primary-600" :stroke-width="2" />
            <span
              class="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-700"
            >
              Licensed Online Pharmacy
            </span>
          </div>

          <!-- Heading -->
          <p class="mt-8 text-lg font-medium text-slate-500">
            Your daily dose of
          </p>

          <h1
            class="mt-2 font-display text-5xl font-extrabold leading-tight text-slate-900 xl:text-6xl"
          >
            Health &
            <span class="block text-accent-600"> Wellness </span>
          </h1>

          <!-- Description -->
          <p class="mt-6 max-w-xl text-[15px] leading-7 text-slate-600">
            Genuine medicines, trusted healthcare brands, vitamins, personal
            care essentials and prescription medicines— delivered quickly with
            pharmacist-backed service.
          </p>

          <!-- Features -->
          <div class="mt-8 flex flex-wrap gap-5">
            <div
              v-for="point in points"
              :key="point"
              class="flex items-center gap-2"
            >
              <CircleCheck class="h-5 w-5 text-accent-600" />

              <span class="text-sm font-semibold text-slate-700">
                {{ point }}
              </span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-10 flex flex-wrap gap-4">
            <RouterLink
              to="/categories"
              class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700"
            >
              Shop Now

              <ArrowRight class="h-4 w-4" />
            </RouterLink>

            <RouterLink
              to="/request-order"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:border-primary-300"
            >
              <Upload class="h-4 w-4 text-primary-600" />

              Upload Prescription
            </RouterLink>
          </div>
        </div>

        <!-- Right Side -->
        <div class="relative hidden lg:flex items-center justify-center">
          <!-- Background Circle -->
          <div
            class="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-br from-accent-100 via-accent-50 to-white"
          ></div>

          <!-- Platform -->
          <div
            class="absolute bottom-8 h-24 w-[360px] rounded-full bg-gradient-to-b from-slate-200 to-slate-300 shadow-inner"
          ></div>

          <!-- Featured Product -->
          <div class="relative z-10">
            <img
              v-if="showcase.length"
              :src="showcase[0].image"
              :alt="showcase[0].name"
              class="mx-auto h-[360px] object-contain drop-shadow-2xl transition duration-500 hover:scale-105"
            />
          </div>

          <!-- Delivery Card -->
          <div
            class="absolute top-10 right-0 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-slate-200"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100"
              >
                <Truck class="h-5 w-5 text-accent-600" />
              </div>

              <div>
                <p class="text-sm font-bold text-slate-800">Fast Delivery</p>

                <p class="text-xs text-slate-500">Across Bangladesh</p>
              </div>
            </div>
          </div>

          <!-- Genuine Card -->
          <div
            class="absolute bottom-8 left-0 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-slate-200"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100"
              >
                <BadgeCheck class="h-5 w-5 text-primary-600" />
              </div>

              <div>
                <p class="text-sm font-bold text-slate-800">100% Genuine</p>

                <p class="text-xs text-slate-500">Licensed Suppliers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  Pill,
  ShieldCheck,
  Truck,
  Upload,
} from "lucide-vue-next";
import LiveSearch from "../layout/LiveSearch.vue";
import { formatPrice } from "../../utils/formatPrice";
import CategorySidebar from "../category/CategorySidebar.vue";

const props = defineProps({
  products: Array,
  loading: Boolean,
  categories: {
    type: Array,
    default: () => [],
  },
  categoryLoading: {
    type: Boolean,
    default: false,
  },
  drawerOpen: {
    type: Boolean,
    default: false,
  },
  suggestions: Array,
});

const emit = defineEmits(["close-sidebar"]);

const search = ref(null);

/** Prefer products that actually have artwork for the hero cluster. */
const showcase = computed(() => {
  const withImage = props.products.filter((product) => product.image);
  return (withImage.length >= 4 ? withImage : props.products).slice(0, 4);
});

const points = ["100% genuine", "Secure payment", "Easy returns"];
</script>
