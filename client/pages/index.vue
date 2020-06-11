<template>
  <div>
    <ArticleList :page="state.page" />
    <!-- TODO 前後ボタン -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'nuxt-composition-api'
import ArticleList from '@/components/organisms/ArticleList/index.vue'

export default defineComponent({
  components: {
    ArticleList
  },
  setup () {
    const state = reactive({ page: 0 })
    const pageNext = () => {
      state.page++
    }
    const pageBack = () => {
      state.page--
    }

    return { state, pageNext, pageBack }
  }
})
</script>
