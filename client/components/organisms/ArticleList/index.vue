<template>
  <div v-if="state.articles">
    <ArticleCard
      v-for="article in state.articles[page - 1]"
      :key="article.path"
      :article="article"
      class="article-card"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  reactive,
} from 'nuxt-composition-api'
import ArticleCard from '@/components/molecules/ArticleCard/index.vue'

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
  },
  components: {
    ArticleCard,
  },
  setup() {
    const { $content } = useContext()
    const state = reactive({ articles: [], a: 0 }) as {
      articles: ArticleT[][]
      a: number
    }
    const articles = useAsync(
      async () =>
        (await $content('articles', { deep: true })
          .only(['title', 'tags', 'description', 'path', 'createdDate'])
          .sortBy('createdDate', 'desc')
          .fetch()) as ArticleT[]
    )
    if (articles.value) {
      const tmp = []
      for (let i = 0; i < articles.value.length / 10; i++) {
        tmp.push(articles.value.slice(i * 10, 10 + i * 10))
      }
      state.articles = tmp
    }

    return { state }
  },
})
</script>

<style lang="scss" scoped>
.article-card:not(:last-child) {
  margin-bottom: 16px;
}
</style>
