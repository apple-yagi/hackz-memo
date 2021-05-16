<template>
  <button class="button" @click="onClick" :disabled="disabled">
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
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.button {
  border: none;
  outline: none;
  padding: 5px 40px;
  border-radius: 15px;
  background-color: $ui-accent;
  font-weight: bold;

  &:disabled {
    background-color: #ccc;
  }
}
</style>
