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
    const post = useAsync(
      async () => (await $content(route.value.path.slice(1)).fetch()) as postT
    )

    return { post }
  },
})
</script>
