<template>
  <div>
    <AuthenticateForm action="Register" v-on:submit-clicked="register($event)"></AuthenticateForm>
    <p>Already have an account? Login <router-link to="/login">here</router-link></p>
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
    register ({email, password}) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((stuff) => {
          console.log('printing returned stuff', stuff)
        })
        .catch((error) => {
          // how would i tell the child component that there has been a problem?
          console.log('error code', error.code)
          console.log('error message', error.message)
        })
    }
  }
}
</script>
