<template>
  <v-card nuxt :to="article.path" class="ma-4">
    <CardTitle :text="article.title" />
    <CardText :text="article.description" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'nuxt-composition-api'
import CardTitle from '@/components/atoms/CardTitle/index.vue'
import CardText from '@/components/atoms/CardText/index.vue'

type ArticleT = {
  title: string
  description: string
  path: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  createdDate?: Date
}

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<ArticleT>,
      required: true,
    },
  },
  components: {
    CardTitle,
    CardText,
  },
})
</script>
