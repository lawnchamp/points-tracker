<template>
  <div>
    <AuthenticateForm action="Login" @submit-clicked="login($event)"></AuthenticateForm>
    <p>Don't have an account? Register <router-link to="/register">here</router-link></p>
  </div>
</template>
<script>

import AuthenticateForm from '@/components/AuthenticateForm.vue'
import firebase from '@/firebase.js'

export default {
  components: {
    AuthenticateForm
  },
  methods: {
    login ({email, password}) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((stuff) => {
          console.log('logging stuff returned from successful login: ', stuff)
          this.$router.replace('/points')
        }).catch((error) => {
          console.log('error.code: ', error.code)
          console.log('error.message: ', error.message)
        })
    }
  }
}
</script>
