<template>
  <div v-if="state && state.post">
    <h1 class="text-h4">{{ state.post ? state.post.title : '' }}</h1>
    <div><v-icon class="mr-1" small>tag</v-icon>{{ state.categories }}</div>
    <div class="mb-2 d-flex justify-end">
      <v-icon class="mr-1" small>schedule</v-icon>{{ state.createdAt }}
    </div>
    <nuxt-content :document="state.post" />
    <social-share-component
      :url="url"
      :text="state.post ? state.post.title + ' - 物置小屋' : ''"
    ></social-share-component>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useMeta,
  useAsync,
} from '@nuxtjs/composition-api'
// @ts-ignore
import { Tweet } from 'vue-tweet-embed'
import { SocialShareComponent } from 'vue-social-share-component'
import LinkCard from '@/components/molecules/LinkCard/index.vue'

type postT = {
  title: string
  description: string
  path: string
  categories: string[]
  createdDate: string
  updateDate?: string
  body: Object
}

export default defineComponent({
  components: {
    LinkCard,
    Tweet,
    SocialShareComponent,
  },
  head: {},
  setup() {
    const { $content, route } = useContext()
    // const { title, meta } = useMeta({
    //   title: '記事ページ',
    //   meta: [
    //     {
    //       property: 'og:title',
    //       content: '記事ページ',
    //       'data-hid': 'og:title',
    //       type: 'article',
    //       name: 'og:title',
    //     },
    //   ],
    // })

    let path = route.value.path.slice(1)
    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1)
    }

    const yyyymmdd = (y: number, m: number, d: number) => {
      const yyyy = ('000' + y).slice(-4)
      const mm = ('0' + m).slice(-2)
      const dd = ('0' + d).slice(-2)

      return `${yyyy}年${mm}月${dd}日`
    }
    const state = useAsync(async () => {
      const post = (await $content(path).fetch<postT>()) as postT
      const date = new Date(`${post.createdDate}+09:00`)
      return {
        post,
        categories: post.categories.join(', '),
        createdAt: yyyymmdd(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        ),
      }
    })

    useMeta({
      title: state.value?.post.title ?? '',
      meta: [
        {
          property: 'og:title',
          content: state.value?.post.title ?? '',
          'data-hid': 'og:title',
          type: 'article',
          name: 'og:title',
        },
      ],
    })

    const url = `https://blog.mnao305.com/${path}`

    return { state, url }
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
