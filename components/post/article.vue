<template>
  <article class="article">
    <div class="flex">
      <div class="flex flex-col items-center">
        <img
          class="rounded-full"
          :src="post.poster.photoUrl"
          alt="user"
          width="40"
          height="40"
        />
        <span>{{ post.poster.displayName }}</span>
      </div>
      <div class="pl-5 pt-2 whitespace-pre-wrap">{{ post.text }}</div>
    </div>
    <p class="mt-2 font-extralight text-sm">{{ post.created_at }}</p>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { Post } from '~/types/entity'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.article {
  border-bottom: solid 1px #fff;
  padding: 30px 5px 0;
}
</style>
