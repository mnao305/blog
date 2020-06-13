<template>
  <v-app>
    <v-content>
      <Header />
      <v-container fluid class="d-flex flex-row">
        <v-card id="main">
          <nuxt />
        </v-card>
        <Sidebar />
      </v-container>
      <Footer />
    </v-content>
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
#main {
  width: 100%;
  margin-right: 20px;
}
</style>
