import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  mode: 'universal',
  srcDir: 'client',
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - 物置小屋',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'mnao305のメモブログです',
      },
      { hid: 'og:site_name', property: 'og:site_name', content: '物置小屋' },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'mnao305のメモブログです',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: '物置小屋',
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
    '@nuxtjs/composition-api',
    '@nuxtjs/gtm',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxt/content', '@nuxtjs/feed'],
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

  feed: [
    {
      path: '/rss.xml',
      type: 'rss2',
      create: async (feed: any) => {
        const baseUrlArticles = 'https://blog.mnao305.com'

        feed.options = {
          title: '物置小屋',
          description: 'mnao305のブログです',
          link: baseUrlArticles,
        }

        const { $content } = require('@nuxt/content')
        const articles = await $content('/').fetch()

        articles.forEach((article: any) => {
          const url = `${baseUrlArticles}/${article.slug}`
          const description = article.description ?? ''

          feed.addItem({
            title: article.title,
            id: url,
            link: url,
            date: new Date(article.createdAt),
            description,
            content: description,
          })
        })
      },
    },
  ],
}

export default config
