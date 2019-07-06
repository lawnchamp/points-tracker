<template>
  <div class="py-2 border-b mr-3">
    <div class="flex justify-between relative">
      <input
        v-model="name"
        type="text"
        placeholder="Competition name"
        class="rounded border h-10 w-48 px-1 my-1"/>
      <input
        v-model.number="value"
        type="text"
        placeholder="Points"
        class="text-right rounded border h-10 w-20 px-1 my-1"
        @keyup.enter="addNewWeight"/>
    </div>
    <div class="h-8">
      <button
        :disabled="invalidWeight"
        :class="{'opacity-50 cursor-not-allowed':invalidWeight}"
        style="float: right;"
        class="text-xs font-semibold rounded-full px-4 py-1
              leading-normal bg-white border border-green text-green
              hover:bg-green hover:text-white"
        @click="addNewWeight"
      >submit</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AddNewWeight',
  components: {
  },
  data() {
    return {
      name: '',
      value: null,
    }
  },
  computed: {
    invalidWeight() {
      return !this.name || typeof this.value != 'number'
    },
  },
  methods: {
    addNewWeight() {
      if (this.invalidWeight) return

      this.$store.dispatch('addWeight', {
        name: this.name,
        value: this.value,
      })

      this.name = ''
      this.value = null
    },
  },
}
</script>
