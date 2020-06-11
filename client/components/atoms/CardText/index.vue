<template>
  <v-card-text>{{ text }}</v-card-text>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    text: String,
  },
})
</script>
