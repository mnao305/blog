<template>
  <v-pagination v-model="state.page" :length="state.pageLen" />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  PropType,
  useContext,
} from 'nuxt-composition-api'

export default defineComponent({
  props: {
    page: {
      type: Number,
      required: true,
    },
    setPageNumber: {
      type: Function as PropType<(arg: number) => void>,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      page: computed({
        get: () => {
          return props.page
        },
        set: (val) => {
          props.setPageNumber(val)
        },
      }),
      pageLen: 1,
    })

    const { $content } = useContext()

    ;(async () => {
      const articles = await $content('articles', { deep: true })
        .only(['title'])
        .fetch()
      if (articles) {
        state.pageLen = Math.ceil(articles!.length / 10)
      }
    })()

    return { state }
  },
})
</script>
