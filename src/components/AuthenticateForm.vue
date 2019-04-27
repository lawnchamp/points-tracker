<template>
  <div class="border-grey-light p-4">
    <div class="bg-white mx-auto max-w-sm shadow rounded-lg">
      <div class="sm:flex sm:items-center px-6 py-4">
        <form class="mx-auto">
          <legend>{{ action }}</legend>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="my-1 py-1 border-b"
          ><br>
          <input
            v-model="password"
            type="password"
            suggested="new-password"
            placeholder="Password"
            class="my-1 py-1 border-b"
          ><br>
          <button
            :disabled="fieldsAreEmpty"
            class="my-1 text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white"
            type="submit"
            @click.prevent="submitCredentials"
          >{{ action }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthenticateForm',
  props: {
    action: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    fieldsAreEmpty() {
      return this.email.length === 0 || this.password.length === 0
    },
  },
  methods: {
    submitCredentials() {
      if (this.action === 'Login') {
        this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
          .then(() => {
            this.email = ''
            this.password = ''
          })
      } else {
        this.$store.dispatch('registerUser', {email: this.email, password: this.password})
          .then(() => {
            this.email = ''
            this.password = ''
          })
      }
    },
  },
}
</script>

<style scoped lang="scss">
</style>
