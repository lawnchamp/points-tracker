<template>
  <div class="container mx-auto px-4 -mt-32">
    <ul class="bg-white rounded-lg shadow max-w-md px-4 py-2">
      <li
        v-for="(competitionValue, competitionName) in weights"
        :key="competitionName"
        class="flex justify-between py-2 border-b text-lg relative"
      >
        <div class="py-2">
          {{ competitionName }}
        </div>
        <input
          :value="competitionValue"
          type="number"
          class="text-right bg-grey-lighter appearance-none rounded w-20 py-1 mx-3 text-grey-darker leading-tight"
          @change="weightChange(competitionName, parseInt($event.target.value))"
        />
        <button
          class="btn-close text-grey-light text-base"
          @click="remove(competitionName)"
        >x</button>
      </li>
      <AddNewWeight/>
    </ul>
  </div>
</template>

<script>

import AddNewWeight from '@/components/AddNewWeight.vue'

export default {
  name: 'Weights',
  components: {AddNewWeight},
  computed: {
    weights() {
      return this.$store.state.weights
    },
  },
  created() {
    // probably don't need to get new weights everytime i come to the page
    this.$store.dispatch('getWeights')
  },
  methods: {
    remove(name) {
      this.$store.dispatch('removeWeight', name)
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
