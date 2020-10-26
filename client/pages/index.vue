<template>
  <div>
    <ArticleList :page="state.page" :set-article-num="setArticleNum" />
    <MoreButton
      v-if="10 * state.page < state.articleNum"
      class="more-button"
      :on-click="incrementPage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import ArticleList from '@/components/organisms/ArticleList/index.vue'
import MoreButton from '@/components/atoms/MoreButton/index.vue'

export default defineComponent({
  components: {
    ArticleList,
    MoreButton,
  },
  head() {
    return {
      title: '物置小屋',
      titleTemplate: '',
    }
  },
  setup() {
    const state = reactive({ page: 1, articleNum: 0 })
    const incrementPage = () => {
      state.page++
    }

    const setArticleNum = (num: number) => {
      state.articleNum = num
    }

    return { state, incrementPage, setArticleNum }
  },
})
</script>

<style lang="scss" scoped>
.more-button {
  display: block;
  margin: 16px auto;
}
</style>
