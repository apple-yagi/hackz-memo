<template>
  <article class="article">
    <div class="flex">
      <div>
        <nuxt-link :to="`/${post.poster.uid}`">
          <img
            class="rounded-full"
            :src="post.poster.photoUrl"
            alt="user"
            width="40"
            height="40"
          />
        </nuxt-link>
      </div>
      <div class="pl-4">
        <span class="font-bold">{{ post.poster.displayName }}</span>
        <div class="pt-1 whitespace-pre-wrap">{{ post.text }}</div>
      </div>
    </div>
    <p class="mt-2 font-extralight text-sm">{{ post.created_at }}</p>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Post } from '~/types/entity';

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.article {
  border-bottom: solid 1px #fff;
  padding: 10px 10px 0;
}
</style>
