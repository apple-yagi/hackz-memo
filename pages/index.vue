<template>
  <main class="main">
    <client-only>
      <post-article v-for="(post, i) in posts" :key="i" :post="post" />
    </client-only>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePosts } from '~/composables'
import BaseButton from '~/components/shared/BaseButton.vue'
import BaseSidebar from '~/components/shared/BaseSidebar.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseSidebar,
  },
  setup() {
    const { posts, postsIsLoading, postsError } = usePosts()

    return {
      posts,
      postsIsLoading,
      postsError,
    }
  },
})
</script>
