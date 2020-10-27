<template>
  <div v-if="state && state.articles && state.articles.length > 0">
    <ArticleCard
      v-for="article in state.articles.slice(0, 10 * page)"
      :key="article.title"
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
import {
  defineComponent,
  useContext,
  PropType,
  useStatic,
} from '@nuxtjs/composition-api'
import Parser from 'rss-parser'
import ArticleCard from '@/components/molecules/ArticleCard/index.vue'
import ArticleCardSkeleton from '@/components/molecules/ArticleCardSkeleton/index.vue'

export type ArticleT = {
  title?: string
  description?: string
  path?: string
  categories?: string[]
  createdAt?: Date
  link?: string
  pubDate?: string
}

export default defineComponent({
  props: {
    page: {
      type: Number,
      required: true,
    },
    setArticleNum: {
      type: Function as PropType<(num: number) => void>,
      required: true,
    },
  },
  components: {
    ArticleCard,
    ArticleCardSkeleton,
  },
  setup(props) {
    const { $content } = useContext()
    const state = useStatic(
      async () => {
        let articles = [] as ArticleT[]
        let len = 0
        const parser = new Parser()
        // はてなブログの記事
        try {
          const hatena = await parser.parseURL(
            'https://mnao305.hatenablog.com/rss'
          )
          if (hatena.items) {
            articles.push(...hatena.items)
            len += hatena.items.length
          }
        } catch (e) {
          console.error(e)
        }

        // Qiitaの記事
        try {
          const qiita = await parser.parseURL('https://qiita.com/mnao305/feed')
          if (qiita.items) {
            articles.push(...qiita.items)
            len += qiita.items.length
          }
        } catch (e) {
          console.error(e)
        }

        const posts = await $content('/', { deep: true })
          .only(['title', 'categories', 'description', 'path', 'createdAt'])
          .sortBy('createdAt', 'desc')
          .fetch<ArticleT[]>()
        if (posts) {
          articles.push(...posts)
          len += posts.length
        }
        // 全記事を日付の降順でソートする
        articles = articles.sort((a, b) => {
          const aDate = (a.createdAt ?? a.pubDate) as string
          const bDate = (b.createdAt ?? b.pubDate) as string
          // @ts-ignore
          return new Date(bDate) - new Date(aDate)
        })

        return { articles, len }
      },
      undefined,
      'state'
    )
    props.setArticleNum(state.value != null ? state.value.len : 0)
    return { state }
  },
})
</script>

<style lang="scss" scoped>
.article-card:not(:last-child) {
  margin-bottom: 16px;
}
</style>
