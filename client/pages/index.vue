<template>
  <div>
    <div v-for="article in articles" :key="article.path">
      <nuxt-link :to="'article/'+article.slug">
        {{ article.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from 'nuxt-composition-api'

export default defineComponent({
  setup () {
    const { $content } = useContext()
    const articles = useAsync(async () => await $content('articles').limit(10).fetch())

    return { articles }
  }
})
</script>
