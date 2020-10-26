<template>
  <header>
    <h1 class="text-h3 d-flex justify-center">
      <nuxt-link to="/">物置小屋</nuxt-link>
    </h1>
    <p class="text-subtitle-1 d-flex justify-center">メモ置き場</p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style lang="scss" scoped>
h1 > a {
  color: inherit;
  text-decoration: none;
}
</style>
