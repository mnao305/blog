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
  },
  setup() {
    const { $content, route } = useContext()
    const state = reactive({ post: {} }) as { post: postT }
    const path = route.value.path.slice(1)
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
  pre > code {
    background-color: inherit;
    padding: 0;
  }
  p,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 10px;
  }
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
}
</style>
