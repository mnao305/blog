<template>
  <v-btn outlined @click="onClick">More</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
})
</script>
