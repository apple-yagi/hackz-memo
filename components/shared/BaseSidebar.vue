<template>
  <div class="sidebar">
    <div class="md:fixed">
      <img src="/icons/logo.svg" alt="logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  border: solid #fff;
  border-width: 0 1px 1px 1px;

  @include mq() {
    width: 220px;
    border: none;
  }
}
</style>
