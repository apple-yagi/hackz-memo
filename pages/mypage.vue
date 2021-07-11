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
            <div v-if="!clickEdit">
              <p>
                {{ user.profile }}
              </p>
              <div class="text-right">
                <base-icon-button :onClick="() => (clickEdit = true)">
                  <img
                    src="/icons/pencil-icon.svg"
                    alt="edit"
                    width="20"
                    height="20"
                  />
                </base-icon-button>
              </div>
            </div>
            <div v-else>
              <textarea-autosize
                class="profile__textarea"
                v-model="profile"
                placeholder="プロフィールを書いてみよう!"
              ></textarea-autosize>
              <div class="text-right">
                <base-icon-button :onClick="updateProfile">
                  <img
                    src="/icons/update-icon.svg"
                    alt="update"
                    width="20"
                    height="20"
                  />
                </base-icon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-2">
          <base-button :onClick="signOut">サインアウト</base-button>
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
  useContext,
  useRouter,
  watch,
} from '@nuxtjs/composition-api';
import VPostCard from '~/components/domain/post/VPostCard.vue';
import { useUserWithPosts } from '~/composables';

export default defineComponent({
  components: { VPostCard },
  middleware: 'authenticated',
  setup() {
    const router = useRouter();
    const { store, $userRepository } = useContext();
    const currentUser = computed(() => store.state.auth.currentUser);
    const { user, userIsLoading } = useUserWithPosts(currentUser.value.uid);
    const profile = ref('');
    const clickEdit = ref(false);

    const updateProfile = async () => {
      await $userRepository.updateProfile({
        uid: user.value.uid,
        profile: profile.value,
      });
      location.reload();
    };

    const signOut = () => {
      store.dispatch('auth/signOut');
      router.push('/');
    };

    watch(
      () => user.value.profile,
      (text) => {
        profile.value = text || '';
      }
    );

    return {
      user,
      userIsLoading,
      profile,
      signOut,
      clickEdit,
      updateProfile,
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
