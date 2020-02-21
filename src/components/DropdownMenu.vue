<template>
  <div class="relative z-50 h-12 w-12">
    <button type="button" @click.prevent="show = !show">
      <img v-if="photoURL" :src="photoURL" alt="" class="rounded-lg mt-1">
      <svg v-else-if="isAuthenticated" class="text-grey-dark flex-no-shrink block h-10 w-10 border-2 border-grey-darker hover:border-white rounded-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z"/></svg>
      <div v-else class="capitalize text-l text-grey-darker antialiased pt-3">login</div>
    </button>
    <div v-show="show" class="absolute pin-r w-64 bg-grey-lightest rounded mask box-shadow">
      <div v-if="displayName" class="px-4 py-4 border rounded-t no-select bg-grey-light">
        <h4 class="text-dark-softer flex-spaced flex-y-center">
          {{ displayName }}
        </h4>
      </div>
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
      return !!this.userEmail
    },
    photoURL() {
      return this.$store.state.user.photoURL
    },
    displayName() {
      return this.$store.state.user.displayName
    },
    userEmail() {
      return this.$store.getters.currentUserEmail
    },
    logInOrOut() {
      return this.isAuthenticated ? 'Logout' : 'Login'
    },
  },
  methods: {
    changeAuthState() {
      if (this.isAuthenticated) {
        this.$store.dispatch('userSignOut')
      } else {
        this.$router.replace('login')
      }
      this.show = !this.show
    },
  },
}
</script>
