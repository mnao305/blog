<template>
  <div>
    <h1 class="text-h4">{{ post ? post.title : '' }}</h1>
    <nuxt-content :document="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from 'nuxt-composition-api'

type postT = {
  title: string
  description: string
  path: string
  tags: string[]
  createdDate: string
  updateDate?: string
  body: Object
}

export default defineComponent({
  setup() {
    const { $content, route } = useContext()
    const path = route.value.path.slice(1)
    const post = useAsync(async () => (await $content(path).fetch()) as postT)

    return { post }
  },
})
</script>

<style lang="scss" scoped>
.nuxt-content pre > code {
  background-color: inherit;
  padding: 0;
}
</style>
