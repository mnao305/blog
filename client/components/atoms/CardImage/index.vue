<template>
  <v-avatar size="100" tile>
    <v-img :src="imgSrc"></v-img>
  </v-avatar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
  },
})
</script>
