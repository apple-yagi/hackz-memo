<template>
  <div class="container mx-auto">
    <client-only>
      <div class="flex">
        <div class="sidebar">
          <div class="sidebar-content">
            <img src="/icons/logo.svg" alt="logo" />
          </div>
        </div>
        <main class="main-content">
          <div v-if="currentUser" class="form">
            <div class="form-user">
              <img
                class="icon rounded-full"
                :src="currentUser.photoUrl"
                alt="user"
              />
            </div>
            <div class="form-com">
              <textarea
                class="form-input"
                type="text"
                v-model="text"
                placeholder="思いの丈を書きやがれ。"
              />
              <div class="text-right">
                <button class="form-button mr-5" @click="submit">メモる</button>
              </div>
            </div>
          </div>
          <div v-else class="form justify-center items-center">
            <button @click="signIn">サインイン</button>
          </div>
          <article class="article" v-for="(post, i) in posts" :key="i">
            <div class="flex">
              <div class="flex flex-col justify-center items-center">
                <img
                  class="icon rounded-full"
                  src="/icons/user-icon.svg"
                  alt="user"
                />
                <span>どりー</span>
              </div>
              <div class="pl-5 pt-2">{{ post.text }}</div>
            </div>
            <span class="pt-1">{{ post.created_at }}</span>
          </article>
        </main>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import useData from '~/composables/index.composables'

export default defineComponent({
  setup() {
    const { store, $postRepository } = useContext()
    const { posts, postsIsLoading, postsError } = useData()
    const text = ref('')

    const signIn = () => {
      store.dispatch('auth/signIn')
    }

    const signOut = () => {
      store.dispatch('auth/signOut')
    }

    const submit = () => {
      $postRepository.store({
        uid: store.state.auth.currentUser.uid,
        text: text.value,
      })
    }

    return {
      currentUser: computed(() => store.state.auth.currentUser),
      submit,
      posts,
      postsIsLoading,
      postsError,
      signIn,
      signOut,
      text,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 1020px;
}

.main-content {
  margin: auto;
  width: 100%;
  min-height: 100vh;
  border: solid 1px #fff;
}

.sidebar {
  width: 220px;
  &-content {
    position: fixed;
  }
}

.form {
  display: flex;
  border-bottom: solid 1px #fff;
  padding: 15px;

  &-user {
    padding-right: 15px;
  }

  &-com {
    width: 100%;
  }

  &-input {
    width: 100%;
    padding-top: 3px;
    background-color: $bg-main;
    border: none;
    outline: none;
  }
}

.article {
  border-bottom: solid 1px #fff;
  padding: 30px 5px 0;
}

.icon {
  width: 40px;
  height: 40px;
}
</style>
