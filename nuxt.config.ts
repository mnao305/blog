import { Configuration } from '@nuxt/types'

const config: Configuration = {
  mode: 'spa',
  srcDir: 'client',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - 物置小屋',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'mnao305のメモブログです',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    'nuxt-composition-api',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxt/content', '@nuxtjs/gtm'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      icons: 'md',
    },
  },
  /**
   * Google Tag Manager
   */
  gtm: {
    id: 'GTM-WWFWH72',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend() {},
  },

  generate: {
    // ! 非同期関数がgenerateだと動かないらしい。
    // ! https://github.com/nuxt-community/composition-api/issues/44
    // ! そのための措置
    interval: 2000,
  },
}

export default config
