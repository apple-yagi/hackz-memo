<template>
  <main class="main">
    <client-only v-if="!userIsLoading">
      <v-profile :user="user" />
      <div v-if="user.posts">
        <v-post-card
          v-for="(post, i) in user.posts"
          :key="i"
          :post="{ ...post, poster: user }"
        />
      </div>
    </client-only>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api';
import VProfile from '~/components/domain/mypage/VProfile.vue';
import VPostCard from '~/components/domain/post/VPostCard.vue';
import { fetchUserWithPosts } from '~/composables/useUser';

export default defineComponent({
  components: { VProfile, VPostCard },
  middleware: 'authenticated',
  setup() {
    const { store } = useContext();
    const currentUser = computed(() => store.state.auth.currentUser);
    const { user, userIsLoading } = fetchUserWithPosts(currentUser.value.uid);

    return {
      user,
      userIsLoading,
    };
  },
});
</script>
