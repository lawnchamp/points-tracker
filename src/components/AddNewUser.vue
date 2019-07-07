<template>
  <div class="py-2 border-b">
    <div class="flex justify-between relative">
      <input
        v-model="email"
        type="text"
        placeholder="New email"
        class="rounded border h-8 w-48 px-1 py-1"
        @keyup.enter="addNewUser"/>
      <button
        :disabled="invalidEmail"
        :class="{'opacity-50 cursor-not-allowed':invalidEmail}"
        class="text-xs font-semibold rounded-full h-8 px-4 py-1
               bg-white border border-green text-green
               hover:bg-green hover:text-white"
        @click="addNewUser"
      >submit</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AddNewUser',
  components: {
  },
  data() {
    return {
      email: '',
    }
  },
  computed: {
    invalidEmail() {
      return !this.email.match(/^.+@.+\..+$/)
    },
    disableButtonClasses() {
      return this.validEmail ? '' : 'opacity-50 cursor-not-allowed'
    },
  },
  methods: {
    addNewUser() {
      if (this.invalidEmail) return

      this.$store.dispatch('addUser', this.email)
      this.email = ''
    },
  },
}
</script>
