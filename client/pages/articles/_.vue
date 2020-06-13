<template>
  <div>
    <nuxt-content :document="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const { $content, route } = useContext()
    const post = useAsync(
      async () => await $content(route.value.path.slice(1)).fetch()
    )

    return { post }
  },
})
</script>
