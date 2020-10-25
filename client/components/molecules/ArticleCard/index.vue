<template>
  <v-card nuxt :to="article.path" :href="article.link">
    <CardTitle>{{ article.title }}</CardTitle>
    <CardSubtitle v-if="tags">
      <v-icon class="mr-1" small>tag</v-icon>{{ tags }}
    </CardSubtitle>
    <div class="d-flex">
      <ArticleCardFromSite v-if="site">{{ site }}</ArticleCardFromSite>
      <ArticleCardPostTime>{{ createdAt }}</ArticleCardPostTime>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'nuxt-composition-api'
import CardTitle from '@/components/atoms/CardTitle/index.vue'
import CardSubtitle from '@/components/atoms/CardSubtitle/index.vue'
import ArticleCardPostTime from '@/components/molecules/ArticleCardPostTime/index.vue'
import ArticleCardFromSite from '@/components/molecules/ArticleCardFromSite/index.vue'
import { ArticleT } from '~/components/organisms/ArticleList/index.vue'

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
    ArticleCardFromSite,
  },
  setup(props) {
    const yyyymmdd = (y: number, m: number, d: number) => {
      const yyyy = ('000' + y).slice(-4)
      const mm = ('0' + m).slice(-2)
      const dd = ('0' + d).slice(-2)

      return `${yyyy}年${mm}月${dd}日`
    }
    let strDate = ''
    if (props.article.createdDate) {
      strDate = props.article.createdDate
    } else if (props.article.pubDate) {
      strDate = props.article.pubDate
    }
    const date = new Date(strDate)
    const createdAt = yyyymmdd(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )

    const tags =
      props.article.tags !== undefined
        ? props.article.tags.join(', ')
        : props.article.categories !== undefined
        ? props.article.categories.join(', ')
        : ''

    let site = ''
    if (props.article.link && props.article.link.match('hatena') != null) {
      site = 'Hatena blog'
    } else if (
      props.article.link &&
      props.article.link.match('qiita') != null
    ) {
      site = 'Qiita'
    }
    console.log(props.article.title, site)

    return { createdAt, tags, site }
  },
})
</script>
