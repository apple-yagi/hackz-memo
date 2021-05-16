<template>
  <div class="container mx-auto">
    <div class="flex">
      <BaseSidebar />
      <div class="w-full">
        <BaseHeader />
        <client-only>
          <post-form
            v-if="currentUser"
            class="border"
            :photoUrl="currentUser.photoUrl"
            :text.sync="text"
            :submit="submit"
          ></post-form>
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
} from '@nuxtjs/composition-api'
import BaseButton from '~/components/shared/BaseButton.vue'
import BaseHeader from '~/components/shared/BaseHeader.vue'
import BaseSidebar from '~/components/shared/BaseSidebar.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseHeader,
    BaseSidebar,
  },
  setup() {
    const { store, $postRepository } = useContext()
    const text = ref('')

    const signIn = () => {
      store.dispatch('auth/signIn')
    }

    const submit = () => {
      if (!text.value) return alert('文字を入力してください')

      $postRepository.store({
        uid: store.state.auth.currentUser.uid,
        text: text.value,
      })
      text.value = ''
    }

    return {
      currentUser: computed(() => store.state.auth.currentUser),
      text,
      submit,
      signIn,
    }
  },
})
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
  width: 1020px;
}
</style>
