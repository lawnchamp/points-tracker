<template>
  <div class="container md:w-1/2 lg:w-1/3">
    <AuthenticateButton/>
    <table class="bg-grey-lightest py-8">
      <tr class="py-8" v-for="(points, name) in weights" :key="name">
        <td class="text-left width py-2">
          {{name}}
        </td>
        <td>
          <input type="number" v-model.number="points.value" class="rounded-lg py-3 px-2"/>
        </td>

        <td>
          <button @click.prevent="remove(name)">X</button>
        </td>
      </tr>
      <NewWeight @new-weight="addNewWeight"></NewWeight>
    </table>
  </div>
</template>

<script>

import AuthenticateButton from '@/components/AuthenticateButton.vue'
import NewWeight from '@/components/NewWeight.vue'

export default {
  name: 'Weights',
  components: {
    AuthenticateButton,
    NewWeight
  },
  computed: {
    weights () {
      return this.$store.state.weights
    }
  },
  methods: {
    remove (name) {
      this.$store.dispatch('removeWeight', name)
    },
    addNewWeight (newWeight) {
      this.$store.dispatch('addWeight', newWeight)
    }
  }
}
</script>
