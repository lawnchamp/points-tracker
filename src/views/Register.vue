<template>
  <div>
    <AuthenticateForm action="Register"></AuthenticateForm>
    <p>Already have an account? Login <router-link to="/login">here</router-link></p>
  </div>
</template>
<script>

import AuthenticateForm from '@/components/AuthenticateForm.vue'

export default {
  components: {
    AuthenticateForm
  }
}
</script>
