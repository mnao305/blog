<template>
  <CardText class="d-flex justify-end">
    <v-icon class="mr-1" small>schedule</v-icon><slot />
  </CardText>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import CardText from '@/components/atoms/CardText/index.vue'

export default defineComponent({
  components: {
    CardText,
  },
})
</script>
