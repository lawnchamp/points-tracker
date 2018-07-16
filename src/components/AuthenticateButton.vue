<template>
  <button type="button" @click="changeAuthState">
    <img class="flex-no-shrink block h-10 w-10 border-2 border-grey-darker hover:border-white rounded-full" src="https://avatars0.githubusercontent.com/u/13643618?v=4" alt="">
  </button>
</template>

<script>

export default {
  name: 'AuthenticateButton',
  methods: {
    changeAuthState () {
      if (this.$store.getters.authenticatedUser) {
        this.$store.dispatch('userSignOut')
      } else {
        this.$router.replace('login')
      }
    }
  }
}
</script>

<style lang="scss">
</style>
