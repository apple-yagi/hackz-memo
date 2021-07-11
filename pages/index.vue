<template>
  <main class="main">
    <client-only>
      <v-post-card v-for="(post, i) in posts" :key="i" :post="post" />
    </client-only>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePosts } from '~/composables'
import VPostCard from '~/components/domain/post/VPostCard.vue'

export default defineComponent({
  components: {
    VPostCard,
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
