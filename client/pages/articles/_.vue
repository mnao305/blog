<template>
  <div v-if="state.post">
    <h1 class="text-h4">{{ state.post ? state.post.title : '' }}</h1>
    <nuxt-content :document="state.post" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  onMounted,
} from 'nuxt-composition-api'

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
    const state = reactive({ post: {} }) as { post: postT }
    const path = route.value.path.slice(1)
    onMounted(async () => {
      const post = (await $content(path).fetch()) as postT
      state.post = post
    })

    return { state }
  },
})
</script>

<style lang="scss" scoped>
.nuxt-content pre > code {
  background-color: inherit;
  padding: 0;
}
</style>
