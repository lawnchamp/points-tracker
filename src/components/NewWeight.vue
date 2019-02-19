<template>
  <div class="py-2 border-b">
    <div class="flex justify-between relative">
      <input
        type="text"
        v-model="name"
        placeholder="Competition name"
        class="rounded border h-10 w-48 px-1 my-1"/>
      <input
        type="number"
        v-model.number="value"
        placeholder="Points"
        @keyup.enter="emitNewWeight"
        class="text-right rounded border h-10 w-20 px-1 my-1"/>
    </div>
    <div class="h-8">
      <button
        @click="emitNewWeight"
        style="float: right;"
        class="text-xs font-semibold rounded-full px-4 py-1
              leading-normal bg-white border border-green text-green
              hover:bg-green hover:text-white">submit</button>
    </div>
  </div>
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
      if (this.name === '' || this.value == null) return

      this.$emit('new-weight', {name: this.name, value: this.value})
      this.name = ''
      this.value = null
    }
  }
}
</script>
