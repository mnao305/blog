<template>
  <v-card
    :href="linkUrl"
    target="_blank"
    class="d-flex flex-row link-card my-3"
    max-width="600px"
  >
    <div :class="{ 'link-card-left': imgSrc }">
      <CardTitle>{{ title }}</CardTitle>
      <CardText class="link-card-text">{{ text }}</CardText>
      <CardText class="link-card-url">{{ linkUrl }}</CardText>
    </div>
    <div v-if="imgSrc" class="ml-auto link-card-img">
      <CardImage :img-src="imgSrc" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
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
      default: '-',
      required: false,
    },
    linkUrl: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.link-card-img {
  display: flex;
  align-items: center;
  > div {
    padding: 0;
  }
}
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
.link-card-left {
  width: calc(100% - 112px);
}
</style>
