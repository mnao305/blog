<template>
  <div v-if="articles">
    <ArticleCard
      v-for="article in articles"
      :key="article.path"
      :article="article"
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
      async () => await $content('articles').limit(10).fetch()
    )

    return { articles }
  },
})
</script>
