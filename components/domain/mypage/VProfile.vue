<template>
  <div class="profile">
    <div class="flex">
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
            <base-icon-button
              :onClick="submit"
              :isLoading="updateUserIsLoading"
            >
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
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  useContext,
  ref,
  useRouter,
  PropType,
} from '@nuxtjs/composition-api';
import { useUpdateProfile } from '~/composables/useUser';
import { User } from '~/types/entity';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup({ user }) {
    const router = useRouter();
    const { store } = useContext();
    const { updateProfile, updateUserIsLoading, updateUserError } =
      useUpdateProfile();
    const profile = ref(user.profile || '');
    const clickEdit = ref(false);

    const submit = async () => {
      updateProfile(user.uid, profile.value).then(() => location.reload());
    };

    const signOut = () => {
      store.dispatch('auth/signOut');
      router.push('/');
    };

    watch(
      () => user.profile,
      (text) => {
        profile.value = text || '';
      }
    );

    watch(
      () => updateUserError,
      (error) => {
        if (error) alert(error);
      }
    );

    return {
      user,
      profile,
      clickEdit,
      updateUserIsLoading,
      submit,
      signOut,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile {
  border-bottom: solid 1px #fff;
  padding: 1.25rem 1.75rem 1.25rem 1.75rem;

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
