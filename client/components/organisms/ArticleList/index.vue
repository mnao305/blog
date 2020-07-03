<template>
  <div v-if="state.articles && state.articles.length > 0">
    <ArticleCard
      v-for="article in state.articles.slice(0, 10 * page)"
      :key="article.path"
      :article="article"
      class="article-card"
    />
  </div>
  <div v-else>
    <ArticleCardSkeleton
      v-for="i in 10"
      :key="'cardSkeleton' + i"
      class="article-card"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from 'nuxt-composition-api'
import ArticleCard from '@/components/molecules/ArticleCard/index.vue'
import ArticleCardSkeleton from '@/components/molecules/ArticleCardSkeleton/index.vue'

type ArticleT = {
  title: string
  description: string
  path: string
  tags: string[]
  createdDate: string
}

export default defineComponent({
  props: {
    page: {
      type: Number,
      required: true,
    },
    setArticleNum: {
      type: Function,
      required: true,
    },
  },
  components: {
    ArticleCard,
    ArticleCardSkeleton,
  },
  setup(props) {
    const { $content } = useContext()
    const state = reactive({ articles: [], a: 0 }) as {
      articles: ArticleT[]
      a: number
    }
    ;(async () => {
      const articles = (await $content('articles', { deep: true })
        .only(['title', 'tags', 'description', 'path', 'createdDate'])
        .sortBy('createdDate', 'desc')
        .fetch()) as ArticleT[]
      if (articles) {
        state.articles = articles
        props.setArticleNum(articles.length)
      }
    })()

    return { state }
  },
})
</script>

<style lang="scss" scoped>
.article-card:not(:last-child) {
  margin-bottom: 16px;
}
</style>
