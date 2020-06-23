<template>
  <div v-if="state.post">
    <h1 class="text-h4 mb-2">{{ state.post ? state.post.title : '' }}</h1>
    <nuxt-content :document="state.post" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  onMounted,
} from 'nuxt-composition-api'
// @ts-ignore
import { Tweet } from 'vue-tweet-embed'
import LinkCard from '@/components/molecules/LinkCard/index.vue'

type postT = {
  title: string
  description: string
  path: string
  tags: string[]
  createdDate: string
  updateDate?: string
  body: Object
}

export default defineComponent({
  components: {
    LinkCard,
    Tweet,
  },
  setup() {
    const { $content, route } = useContext()
    const state = reactive({ post: {} }) as { post: postT }
    let path = route.value.path.slice(1)
    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1)
    }

    onMounted(async () => {
      const post = (await $content(path).fetch()) as postT
      state.post = post
    })

    return { state }
  },
})
</script>

<style lang="scss" scoped>
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
