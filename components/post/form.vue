<template>
  <div class="form">
    <div class="form__account">
      <img
        class="rounded-full"
        :src="photoUrl"
        alt="currentUser"
        width="40"
        height="40"
      />
    </div>
    <div class="w-full">
      <textarea-autosize
        class="form__textarea"
        :value="text"
        @input.native="$emit('update:text', $event.target.value)"
        placeholder="思いの丈を書きやがれ。"
      ></textarea-autosize>
      <div class="text-right">
        <base-button class="mr-5" :onClick="submit" :disabled="!text.length"
          >メモる</base-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import BaseButton from '../shared/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  props: {
    photoUrl: {
      type: String as PropType<string>,
      required: true,
    },
    submit: {
      type: Function as PropType<() => void>,
      required: true,
    },
    text: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  padding: 15px;

  &__account {
    padding-right: 15px;
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
