<template>
  <aside id="BottomContents">
    <img
      class="github-grass-img"
      src="https://grass-graph.moshimo.works/images/mnao305.png"
    />
    <!-- BottomContents Twitterとかタグ一覧とか置く感じかな？ -->
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({})
</script>

<style lang="scss" scoped>
#BottomContents {
  width: 100%;
  .github-grass-img {
    width: 100%;
  }
}
</style>
