<template>
  <v-card nuxt :href="article.path || article.link" elevation="0" outlined>
    <CardTitle>{{ article.title }}</CardTitle>
    <CardSubtitle v-if="categories">
      <v-icon class="mr-1" small>tag</v-icon>{{ categories }}
    </CardSubtitle>
    <div class="d-flex">
      <ArticleCardFromSite v-if="site">{{ site }}</ArticleCardFromSite>
      <ArticleCardPostTime>{{ createdAt }}</ArticleCardPostTime>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
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
    let strDate: any = ''
    if (props.article.createdAt) {
      strDate = props.article.createdAt
    } else if (props.article.pubDate) {
      strDate = props.article.pubDate
    }
    const date = new Date(strDate)
    const createdAt = yyyymmdd(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )

    const categories = props.article.categories?.join(', ') ?? ''

    let site = ''
    if (props.article.link && props.article.link.match('hatena') != null) {
      site = 'Hatena blog'
    } else if (
      props.article.link &&
      props.article.link.match('qiita') != null
    ) {
      site = 'Qiita'
    }

    return { createdAt, categories, site }
  },
})
</script>
