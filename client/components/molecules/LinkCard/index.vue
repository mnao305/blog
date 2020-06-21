<template>
  <v-card
    :href="linkUrl"
    target="_blank"
    class="d-flex flex-row link-card"
    max-width="600px"
  >
    <div>
      <CardTitle>{{ title }}</CardTitle>
      <CardText class="link-card-text">{{ text }}</CardText>
      <CardText class="link-card-url">{{ linkUrl }}</CardText>
    </div>
    <div class="ml-auto">
      <CardImage :img-src="imgSrc" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import CardTitle from '@/components/atoms/CardTitle/index.vue'
import CardText from '@/components/atoms/CardText/index.vue'
import CardImage from '@/components/atoms/CardImage/index.vue'

export default defineComponent({
  components: {
    CardTitle,
    CardText,
    CardImage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    linkUrl: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.link-card * {
  padding: 6px;
}
.link-card-text {
  font-size: 12px;
}
.link-card-url {
  font-size: 10px;
  color: gray;
}
</style>
