<template>
  <div v-if="articles">
    <ArticleCard
      v-for="article in articles"
      :key="article.path"
      :article="article"
      class="article-card"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from 'nuxt-composition-api'
import ArticleCard from '@/components/molecules/ArticleCard/index.vue'

export default defineComponent({
  props: {
    page: Number,
  },
  components: {
    ArticleCard,
  },
  setup() {
    const { $content } = useContext()
    const articles = useAsync(
      async () =>
        await $content('articles', { deep: true })
          .limit(10)
          .only(['title', 'tags', 'description', 'path', 'createdDate'])
          .sortBy('createdDate', 'desc')
          .fetch()
    )
    console.log(articles)

    return { articles }
  },
})
</script>

<style lang="scss" scoped>
.article-card:not(:last-child) {
  margin-bottom: 16px;
}
</style>
