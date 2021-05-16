<template>
  <button class="button" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    onClick: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.button {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: none;
  outline: none;
}
</style>
