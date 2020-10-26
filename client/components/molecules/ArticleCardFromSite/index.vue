<template>
  <CardText>From <slot /></CardText>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CardText from '@/components/atoms/CardText/index.vue'

export default defineComponent({
  components: {
    CardText,
  },
})
</script>
