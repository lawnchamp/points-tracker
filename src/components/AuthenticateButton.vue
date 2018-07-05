<template>
  <div class="static">
    <div class="absolute pin-t pin-r py-2 px-4">
      <!-- <div v-if="currentUser">{{currentUser.email}}</div> -->
      <button class="uppercase text-sm hover:text-blue-dark text-blue-darker" @click="changeAuthState">
        {{loginOrOut}}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AuthenticateButton',
  computed: {
    loginOrOut () {
      return this.$store.getters.authenticatedUser ? 'logout' : 'sign in'
    }
  },
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
