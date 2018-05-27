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
import firebase from '@/firebase.js'

export default {
  name: 'AuthenticateButton',
  computed: {
    loginOrOut () {
      return this.currentUser ? 'logout' : 'sign in'
    },
    currentUser () {
      return firebase.auth().currentUser
    }
  },
  methods: {
    changeAuthState () {
      if (this.currentUser) {
        firebase.auth().signOut()
      } else {
        this.$router.replace('login')
      }
    }
  }
}
</script>

<style lang="scss">
</style>
