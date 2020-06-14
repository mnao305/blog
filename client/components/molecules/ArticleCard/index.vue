<template>
  <v-card nuxt :to="article.path">
    <CardTitle>{{ article.title }}</CardTitle>
    <CardSubtitle>{{ article.description }}</CardSubtitle>
    <ArticleCardPostTime>{{ createdAt }}</ArticleCardPostTime>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'nuxt-composition-api'
import CardTitle from '@/components/atoms/CardTitle/index.vue'
import CardSubtitle from '@/components/atoms/CardSubtitle/index.vue'
import ArticleCardPostTime from '@/components/molecules/ArticleCardPostTime/index.vue'

type ArticleT = {
  title: string
  description: string
  path: string
  tags: string[]
  createdDate: string
  updateDate?: string
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
    CardSubtitle,
    ArticleCardPostTime,
  },
  setup(props) {
    const yyyymmdd = (y: number, m: number, d: number) => {
      const yyyy = ('000' + y).slice(-4)
      const mm = ('0' + m).slice(-2)
      const dd = ('0' + d).slice(-2)

      return `${yyyy}年${mm}月${dd}日`
    }
    const date = new Date(props.article.createdDate)
    const createdAt = yyyymmdd(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )

    return { createdAt }
  },
})
</script>
