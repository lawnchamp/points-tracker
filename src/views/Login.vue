<template>
  <div class="-mt-32">
    <AuthenticateForm action="Login"></AuthenticateForm>
    <p>Don't have an account? Register <router-link to="/register">here</router-link></p>
  </div>
</template>
<script>

import AuthenticateForm from '@/components/AuthenticateForm.vue'

export default {
  components: {
    AuthenticateForm,
  },
}
</script>
