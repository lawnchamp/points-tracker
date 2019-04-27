<template>
  <div class="container mx-auto px-4 -mt-32">
    <div class="bg-white rounded-lg shadow max-w-md px-4 py-2">
      <div
        v-for="(competitionValue, competitionName) in weights"
        :key="competitionName"
        class="flex justify-between py-4 border-b text-lg relative"
      >
        <div>
          {{ competitionName }}
        </div>
        <input
          :value="competitionValue"
          type="number"
          class="px-3 w-20 text-right"
          @change="weightChange(competitionName, parseInt($event.target.value))"
        />
        <button
          class="btn-close text-grey-light text-base"
          @click="remove(competitionName)"
        >x</button>
      </div>
      <NewWeight @new-weight="addNewWeight"></NewWeight>
    </div>
  </div>
</template>

<script>

import NewWeight from '@/components/NewWeight.vue'

export default {
  name: 'Weights',
  components: {NewWeight},
  computed: {
    weights() {
      return this.$store.state.weights
    },
  },
  created() {
    this.$store.dispatch('getWeights')
  },
  methods: {
    remove(name) {
      this.$store.dispatch('removeWeight', name)
    },
    addNewWeight(newWeight) {
      this.$store.dispatch('addWeight', newWeight)
    },
    weightChange(weightName, updatedWeight) {
      this.$store.dispatch('changeWeight', {weightName, updatedWeight})
    },
  },
}
</script>

// <style scoped lang="scss">
.btn-close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
