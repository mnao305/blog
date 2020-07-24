<template>
  <aside id="BottomContents">
    <div>
      <a target="_blank" href="https://github.com/mnao305">
        <img
          class="github-grass-img"
          src="https://grass-graph.moshimo.works/images/mnao305.png"
        />
      </a>
    </div>
    <v-row>
      <v-col cols="12" md="6">
        <iframe
          src="https://github.com/sponsors/mnao305/card"
          title="Sponsor mnao305"
          width="100%"
          style="border: 0;"
        ></iframe>
      </v-col>
      <v-col cols="12" md="6">
        <nuxt-link to="/about">
          About(免責事項/Googleアナリティクスについて)
        </nuxt-link>
      </v-col>
      <!-- BottomContents Twitterとかタグ一覧とか置く感じかな？ -->
    </v-row>
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
