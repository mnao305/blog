<template>
  <v-card nuxt :to="'article/'+article.slug">
    <CardTitle :text="article.title" />
    <CardText :text="article.description" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'nuxt-composition-api'
import CardTitle from '@/components/atoms/CardTitle/index.vue'
import CardText from '@/components/atoms/CardText/index.vue'

type ArticleT = {
  title: string;
  slug: string;
  description: string;
}

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<ArticleT>,
      required: true
    }
  },
  components: {
    CardTitle,
    CardText
  }
})
</script>
