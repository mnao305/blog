<template>
  <div>
    <nuxt-content :document="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from 'nuxt-composition-api'

export default defineComponent({
  setup () {
    const { $content } = useContext()
    const post = useAsync(async () => await $content('articles/test').fetch())

    return { post }
  }
})
</script>
