<template>
  <div class="relative">
    <button type="button" @click.prevent="show = !show">
      <svg v-if="isAuthenticated" class="text-grey-dark flex-no-shrink block h-10 w-10 border-2 border-grey-darker hover:border-white rounded-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z"/></svg>
      <div v-else class="capitalize text-l text-grey-darker antialiased pt-3">login</div>
    </button>
    <div v-show="show" class="absolute pin-r w-64 bg-grey-lightest rounded z10 mask box-shadow">
      <div v-if="userEmail" class="px-4 py-4 border rounded-t no-select bg-grey-light">
        <h4 class="text-dark-softer flex-spaced flex-y-center">
          {{ userEmail }}
        </h4>
      </div>
      <div
        class="clickable px-4 py-4 no-select border-r border-b border-l rounded-b hover:bg-grey-light"
        @click="changeAuthState"
      >
        <h4>{{ logInOrOut }}</h4>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
    }
  },
  computed: {
    isAuthenticated() {
      return !!this.$store.getters.authenticatedUser
    },
    userEmail() {
      return this.$store.getters.authenticatedUser
    },
    logInOrOut() {
      return this.isAuthenticated ? 'Logout' : 'Login'
    },
  },
  methods: {
    changeAuthState() {
      if (this.$store.getters.authenticatedUser) {
        this.$store.dispatch('userSignOut')
      } else {
        this.$router.replace('login')
      }
      this.show = !this.show
    },
  },
}
</script>
