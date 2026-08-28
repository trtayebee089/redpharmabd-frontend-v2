<template>
  <section class="grid min-w-0 items-start xl:grid-cols-[330px_minmax(0,1fr)]">
    <!-- Desktop Sidebar -->
    <CategorySidebar
      :categories="categories"
      :loading="categoryLoading"
      :open="drawerOpen"
      @close="emit('close-sidebar')"
    />

    <div class="relative min-w-0 overflow-hidden bg-white max-h-[calc(100vh)]">
      <!-- Decorative Background -->
      <span
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white to-accent-50/80"
      ></span>

      <span
        class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-200/35 blur-3xl"
      ></span>

      <span
        class="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary-100/45 blur-3xl"
      ></span>

      <!-- Hero Content -->
      <div
        class="relative grid min-h-[100vh] min-w-0 items-center gap-8 px-4 py-12 sm:min-h-[83vh] sm:px-6 lg:min-h-[83vh] lg:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] lg:gap-10 lg:px-10 xl:px-12"
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
          <p class="mt-7 text-base font-medium text-slate-500 sm:text-lg">
            Your daily dose of
          </p>

          <h1
            class="mt-2 font-display text-[2.5rem] font-extrabold leading-[1.05] text-slate-900 sm:text-5xl xl:text-6xl"
          >
            Health &
            <span class="block text-accent-600"> Wellness </span>
          </h1>

          <!-- Description -->
          <p class="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:mt-6 sm:text-[15px] sm:leading-7">
            Genuine medicines, trusted healthcare brands, vitamins, personal
            care essentials and prescription medicines— delivered quickly with
            pharmacist-backed service.
          </p>

          <!-- Features -->
          <div class="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:mt-8">
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
          <div class="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <RouterLink
              to="/categories"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-primary-700"
            >
              Shop Now

              <ArrowRight class="h-4 w-4" />
            </RouterLink>

            <RouterLink
              to="/request-order"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:border-primary-300 hover:bg-primary-50"
            >
              <Upload class="h-4 w-4 text-primary-600" />

              Upload Prescription
            </RouterLink>
          </div>
        </div>

        <!-- Right Side -->
        <div class="relative hidden min-w-0 items-center justify-center lg:flex">
          <!-- Background Circle -->
          <div
            class="absolute h-[390px] w-[390px] max-w-full rounded-full bg-gradient-to-br from-accent-100 via-accent-50 to-white xl:h-[420px] xl:w-[420px]"
          ></div>

          <!-- Platform -->
          <div
            class="absolute bottom-8 h-24 w-[min(360px,88%)] rounded-full bg-gradient-to-b from-slate-100 to-slate-200"
          ></div>

          <!-- Featured Product -->
          <div class="relative z-10">
            <img
              v-if="showcase.length"
              :src="showcase[0].image"
              :alt="showcase[0].name"
              class="mx-auto h-[330px] max-w-full object-contain drop-shadow-xl transition duration-500 hover:scale-105 xl:h-[360px]"
            />
          </div>

          <!-- Delivery Card -->
          <div
            class="absolute right-0 top-10 rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-slate-900/[0.06]"
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
            class="absolute bottom-8 left-0 rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-slate-900/[0.06]"
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
import { computed } from "vue";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  ShieldCheck,
  Truck,
  Upload,
} from "lucide-vue-next";
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

/** Prefer products that actually have artwork for the hero cluster. */
const showcase = computed(() => {
  const withImage = props.products.filter((product) => product.image);
  return (withImage.length >= 4 ? withImage : props.products).slice(0, 4);
});

const points = ["100% genuine", "Secure payment", "Easy returns"];
</script>
