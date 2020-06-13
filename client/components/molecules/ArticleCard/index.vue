<template>
  <v-card nuxt :to="article.path">
    <CardTitle :text="article.title" />
    <CardSubtitle :text="article.description" />
    <CardText :text="createdAt" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'nuxt-composition-api'
import CardTitle from '@/components/atoms/CardTitle/index.vue'
import CardSubtitle from '@/components/atoms/CardSubtitle/index.vue'
import CardText from '@/components/atoms/CardText/index.vue'

type ArticleT = {
  title: string
  description: string
  path: string
  tags: string[]
  createdAt: string
  updatedAt: string
  createdDate?: string
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
    CardText,
  },
  setup(props) {
    const date = props.article.createdDate ?? props.article.createdAt

    let createdAt = ''
    // ? createdAtがブラウザ側だとStringだけどサーバ側だとObject。なぜ？
    if (process.browser) {
      // ブラウザ側のみで行う処理
      createdAt = new Date(date).toString()
    } else {
      // const a = JSON.parse(JSON.stringify(props.article))
      // console.log(a)
    }

    return { createdAt }
  },
})
</script>
