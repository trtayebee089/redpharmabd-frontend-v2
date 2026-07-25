<template>
  <FormPage
    title="Track your order"
    subtitle="Enter your order number and phone number to check the latest status."
    button="Track order"
    :fields="fields"
    @submit="track"
  />
</template>

<script setup>
import FormPage from './partials/FormPage.vue'
import { useUiStore } from '../stores/uiStore'

const ui = useUiStore()
const fields = [
  { name: 'order_id', label: 'Order number', required: true },
  { name: 'phone', label: 'Phone number', required: true },
]

function track() {
  ui.toast('Tracking request received. Live status depends on backend availability.', 'info')
}
</script>
