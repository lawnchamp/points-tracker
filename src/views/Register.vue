<template>
  <div>
    <AuthenticateForm action="Register" v-on:submit-clicked="register($event)"></AuthenticateForm>
    <p>Already have an account? Login <router-link to="/login">here</router-link></p>
  </div>
</template>
<script>

import AuthenticateForm from '@/components/AuthenticateForm.vue'

export default {
  components: {
    AuthenticateForm
  },
  methods: {
    register ({email, password}) {
      this.$store.dispatch('registerUser', { email, password })
    }
  }
}
</script>
