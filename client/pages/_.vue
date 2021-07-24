<template>
  <div v-if="post">
    <h1 class="text-h4">{{ post ? post.title : '' }}</h1>
    <div><v-icon class="mr-1" small>tag</v-icon>{{ categories }}</div>
    <div class="mb-2 d-flex justify-end">
      <v-icon class="mr-1" small>schedule</v-icon>{{ createdAt }}
    </div>
    <nuxt-content :document="post" />
    <client-only>
      <social-share-component
        :url="url"
        :text="post ? post.title + ' - 物置小屋' : ''"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { SocialShareComponent } from 'vue-social-share-component'
import Vue from 'vue'

type postT = {
  title: string
  description: string
  path: string
  categories: string[]
  createdAt: Date
  updatedAt?: Date
  body: Object
}

export default Vue.extend({
  components: {
    SocialShareComponent,
  },
  async asyncData({ $content, params }) {
    const path = params.pathMatch

    const post = (await $content(path).fetch<postT>()) as postT

    const date = new Date(post.createdAt)
    const yyyymmdd = (y: number, m: number, d: number) => {
      const yyyy = ('000' + y).slice(-4)
      const mm = ('0' + m).slice(-2)
      const dd = ('0' + d).slice(-2)

      return `${yyyy}年${mm}月${dd}日`
    }
    const title = post.title

    const categories = post.categories.join(', ')
    const createdAt = yyyymmdd(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )

    const url = `https://blog.mnao305.com/${path}`

    return {
      post,
      categories,
      createdAt,
      title,
      url,
    }
  },
  data() {
    return {
      title: '',
      post: {} as postT,
      categories: '',
      createdAt: '',
      url: '',
    }
  },
  head(): any {
    return {
      htmlAttrs: {
        lang: 'ja',
      },
      title: this.title,
      meta: [
        {
          property: 'og:title',
          content: this.title,
          'data-hid': 'og:title',
          type: 'article',
          name: 'og:title',
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em !important;
}
.nuxt-content {
  /* コードブロック */
  .nuxt-content-highlight {
    position: relative;
    margin: 20px 0;
    .filename {
      position: absolute;
      top: -10px;
      padding: 0 10px;
      background: #f3ddc8;
      margin-bottom: 4px;
    }
    pre > code {
      background-color: inherit;
      padding: 0;
    }
  }
  p,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 10px;
  }

  /* hタグ用の飾り */
  h2::before {
    content: '# ';
  }
  h3::before {
    content: '## ';
  }
  h4::before {
    content: '### ';
  }
  h5::before {
    content: '#### ';
  }
  h6::before {
    content: '##### ';
  }

  /* 引用 */
  blockquote {
    position: relative;
    padding: 30px 15px 8px 15px;
    box-sizing: border-box;
    font-style: italic;
    background: #efefef;
    color: #555;
    margin-bottom: 0.5em;
    :before {
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 3px;
      content: '“';
      font-family: sans-serif;
      color: #cfcfcf;
      font-size: 90px;
      line-height: 1;
    }
    p {
      padding: 0;
      margin: 10px 0;
      line-height: 1.7;
    }
    cite {
      display: block;
      text-align: right;
      color: #888888;
      font-size: 0.9em;
    }
  }
  img {
    max-width: min(100%, 700px);
  }
}
</style>
