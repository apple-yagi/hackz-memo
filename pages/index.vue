<template>
  <main class="main">
    <client-only>
      <post-article v-for="(post, i) in posts" :key="i" :post="post" />
    </client-only>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useData from '~/composables/index.composables'
import BaseButton from '~/components/shared/BaseButton.vue'
import BaseSidebar from '~/components/shared/BaseSidebar.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseSidebar,
  },
  setup() {
    const { posts, postsIsLoading, postsError } = useData()

    return {
      posts,
      postsIsLoading,
      postsError,
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  margin: auto;
  width: 100%;
  min-height: 100vh;
  border: solid #fff;
  border-width: 0 1px 1px 1px;
}
</style>
