<template>
  <header class="header">
    <NuxtLink class="header__link" to="/">HOME</NuxtLink>
    <NuxtLink class="header__link" to="/mypage">MYPAGE</NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  border: solid 1px #fff;
  border-width: 0px 1px 0 1px;

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 40px;
    font-weight: bold;
  }

  &__link.nuxt-link-exact-active {
    background-color: $ui-accent;
  }
}
</style>
