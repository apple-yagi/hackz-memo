<template>
  <button @click="signOut">サインアウト</button>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup() {
    const { store } = useContext()

    const signOut = () => {
      store.dispatch('auth/signOut')
    }

    return {
      signOut,
    }
  },
})
</script>
