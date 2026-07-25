<template>
  <FormPage
    title="Request a medicine"
    subtitle="Share medicine details or upload a prescription and our team will help you place the order."
    button="Send request"
    :fields="fields"
    @submit="send"
  />
</template>

<script setup>
import FormPage from './partials/FormPage.vue'
import { useUiStore } from '../stores/uiStore'

const ui = useUiStore()
const fields = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'phone', label: 'Phone number', required: true },
  { name: 'medicine', label: 'Medicine details', type: 'textarea', required: true },
]

function send() {
  ui.toast('Medicine request submitted.')
}
</script>
