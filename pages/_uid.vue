<template>
  <main class="main">
    <client-only v-if="!userIsLoading">
      <div class="profile">
        <div class="profile__container">
          <img
            class="profile__avatar"
            :src="user.photoUrl"
            alt="user"
            width="70"
            height="70"
          />
          <div class="profile__content">
            <h5 class="profile__name">{{ user.displayName }}</h5>
            <div>
              <p>
                {{ user.profile }}
              </p>
            </div>
          </div>
        </div>
      </div>
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
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  watch,
} from '@nuxtjs/composition-api';
import VPostCard from '~/components/domain/post/VPostCard.vue';
import { useUserWithPosts } from '~/composables';

export default defineComponent({
  components: { VPostCard },
  setup() {
    const route = useRoute();
    const uid = computed(() => route.value.params.uid);
    const { user, userIsLoading } = useUserWithPosts(uid.value);
    const profile = ref('');

    watch(
      () => user.value.profile,
      (text) => {
        profile.value = text || '';
      }
    );

    return {
      user,
      userIsLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile {
  border-bottom: solid 1px #fff;
  padding: 1.25rem 1.75rem 1.25rem 1.75rem;

  .profile__container {
    display: flex;
  }

  &__avatar {
    width: 70px;
    height: 70px;
    border-radius: 9999px;
  }

  &__content {
    width: 100%;
    padding-left: 20px;
    padding-right: 30px;
  }

  &__name {
    font-size: 24px;
    font-weight: bold;
  }

  &__textarea {
    width: 100%;
    padding-top: 3px;
    background-color: $bg-main;
    border: none;
    outline: none;
  }
}
</style>
