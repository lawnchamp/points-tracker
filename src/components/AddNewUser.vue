<template>
  <div class="py-2 border-b">
    <div class="flex justify-between relative">
      <input
        v-model="email"
        type="text"
        placeholder="New email"
        class="rounded border h-8 w-48 px-1 py-1"/>
      <button
        :disabled="email.length == 0"
        class="text-xs font-semibold rounded-full h-8 px-4 py-1
               bg-white border border-green text-green
               hover:bg-green hover:text-white"
        @click="emitNewUser"
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
  methods: {
    emitNewUser() {
      this.$emit('new-user', this.email)
      this.email = ''
    },
  },
}
</script>
