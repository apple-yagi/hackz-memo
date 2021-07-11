<template>
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row">
      <BaseSidebar />
      <div class="w-full">
        <BaseHeader />
        <client-only>
          <v-post-form
            v-if="currentUser"
            class="border"
            :photoUrl="currentUser.photoUrl"
            :text.sync="text"
            :submit="submit"
            :isLoading="addPostIsLoading"
            :error="addPostError"
          />
          <div v-else class="flex py-6 border justify-center items-center">
            <base-button :onClick="signIn">サインイン</base-button>
          </div>
        </client-only>
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import VPostForm from '~/components/domain/post/VPostForm.vue';
import { useAddPost } from '~/composables/usePost';

export default defineComponent({
  components: {
    VPostForm,
  },
  setup() {
    const { store } = useContext();
    const { addPost, addPostIsLoading, addPostError } = useAddPost();
    const text = ref('');

    const signIn = () => {
      store.dispatch('auth/signIn');
    };

    const submit = async () => {
      await addPost(store.state.auth.currentUser.uid, text.value);
      text.value = '';
    };

    return {
      currentUser: computed(() => store.state.auth.currentUser),
      text,
      addPostError,
      addPostIsLoading,
      submit,
      signIn,
    };
  },
});
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: $bg-main;
  color: $text-white;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main {
  margin: auto;
  width: 100%;
  min-height: 100vh;
  border: solid #fff;
  border-width: 0 1px 1px 1px;
}

.container {
  max-width: 1020px;
}
</style>
