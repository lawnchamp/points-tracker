<template>
  <tr>
    <td>
      <input
        type="text"
        v-model="name"
        placeholder="Competition Name"
        class="rounded-lg py-3 px-2"
      >
    </td>
    <td>
      <input
        type="number"
        class="rounded-lg py-3 px-2"
        v-model.number="value"
        placeholder="Points Awarded"
      >
    </td>
    <td>
      <button
        class="px-2 mx-2 border border-blue py-3 px-2 rounded"
        @click="emitNewWeight">Add
      </button>
    </td>
  </tr>
</template>

<script>

export default {
  name: 'Weights',
  components: {
  },
  data () {
    return {
      name: '',
      value: null
    }
  },
  methods: {
    emitNewWeight () {
      if (this.name == '' || this.value == null) return

      this.$emit('new-weight', {name: this.name, value: this.value})
      this.name = ''
      this.value = null
    }
  }
}
</script>
