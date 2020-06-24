<template>
  <div>
    <ArticleList :page="state.page" />
    <Pagination :page="state.page" :set-page-number="setPageNumber" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'nuxt-composition-api'
import ArticleList from '@/components/organisms/ArticleList/index.vue'
import Pagination from '@/components/molecules/Pagination/index.vue'

export default defineComponent({
  components: {
    ArticleList,
    Pagination,
  },
  head() {
    return {
      title: '物置小屋',
      titleTemplate: '',
    }
  },
  setup() {
    const state = reactive({ page: 1 })
    const setPageNumber = (num: number) => {
      state.page = num
    }

    return { state, setPageNumber }
  },
})
</script>
