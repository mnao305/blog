<template>
  <div>
    <ArticleList :page="page" :set-article-num="setArticleNum" />
    <MoreButton
      v-if="10 * page < articleNum"
      class="more-button"
      :on-click="incrementPage"
    />
  </div>
</template>

<script lang="ts">
import ArticleList from '@/components/organisms/ArticleList/index.vue'
import MoreButton from '@/components/atoms/MoreButton/index.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    ArticleList,
    MoreButton,
  },
  data() {
    return {
      page: 1,
      articleNum: 0,
    }
  },
  head() {
    return {
      title: '物置小屋',
      titleTemplate: '',
      htmlAttrs: {
        lang: 'ja',
      },
    }
  },
  methods: {
    incrementPage() {
      this.page++
    },
    setArticleNum(num: number) {
      this.articleNum = num
    },
  },
})
</script>

<style lang="scss" scoped>
.more-button {
  display: block;
  margin: 16px auto;
}
</style>
