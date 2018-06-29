<template>
  <div>
    <AuthenticateForm action="Login" @submit-clicked="login($event)"></AuthenticateForm>
    <p>Don't have an account? Register <router-link to="/register">here</router-link></p>
  </div>
</template>
<script>

import AuthenticateForm from '@/components/AuthenticateForm.vue'

export default {
  components: {
    AuthenticateForm
  },
  methods: {
    login ({email, password}) {
      this.$store.dispatch('userSignIn', { email, password })
    }
  }
}
</script>
