<template>
  <v-card-subtitle>{{ text }}</v-card-subtitle>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    text: String,
  },
})
</script>
