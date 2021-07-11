<template>
  <button class="button" @click="onClick" :disabled="isLoading">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    onClick: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.button {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: none;
  outline: none;

  &:disabled {
    background-color: #ccc;
  }
}
</style>
