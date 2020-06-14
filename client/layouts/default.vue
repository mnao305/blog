<template>
  <v-app>
    <v-main id="content-wrapper">
      <Header />
      <v-container fluid class="d-flex flex-row">
        <v-card id="main" class="pa-4">
          <nuxt />
          <v-divider class="my-4 dots" />
          <BottomContents />
        </v-card>
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import Header from '@/components/organisms/Header/index.vue'
import Footer from '@/components/organisms/Footer/index.vue'
import BottomContents from '@/components/organisms/BottomContents/index.vue'

export default defineComponent({
  components: {
    Header,
    Footer,
    BottomContents,
  },
})
</script>

<style lang="scss" scoped>
#content-wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

#main {
  width: 100%;
}

.dots {
  border-width: 0 0 8px;
  border-style: solid;
  border-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1"><circle fill="hsla(0, 0%, 65%, 1.0)" cx="1" cy="0.5" r="0.5"/></svg>')
    0 0 100% repeat;
  width: 100%;
}
</style>
