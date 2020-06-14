<template>
  <v-app>
    <v-main id="content-wrapper">
      <Header />
      <v-container fluid class="d-flex flex-row">
        <v-card id="main" class="pa-4">
          <nuxt />
        </v-card>
        <Sidebar />
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import Header from '@/components/organisms/Header/index.vue'
import Footer from '@/components/organisms/Footer/index.vue'
import Sidebar from '@/components/organisms/Sidebar/index.vue'

export default defineComponent({
  components: {
    Header,
    Footer,
    Sidebar,
  },
})
</script>

<style lang="scss" scoped>
#content-wrapper {
  max-width: 980px;
  margin: 0 auto;
}

#main {
  width: 100%;
  margin-right: 20px;
}
</style>
