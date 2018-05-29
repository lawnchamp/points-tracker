<template>
  <div>
    <AuthenticateButton/>
    <table class="bg-grey-lightest py-8">
      <tr class="py-8" v-for="(points, name) in weights" :key="name">
        <td class="text-left py-2">
          {{formattedName(name)}}
        </td>
        <td>
          <input type="number" v-model="weights[name]" class="rounded-lg py-3 px-2"/>
        </td>

        <td>
          <button @click.prevent="remove(name)">X</button>
        </td>
      </tr>
      <!-- <tr> -->
        <NewWeight @new-weight="addNewWeight"></NewWeight>
      <!-- </tr> -->
    </table>
    <inc></inc>
  </div>
</template>

<script>

import competitionWeights from '@/data/competitionWeights.js'
import AuthenticateButton from '@/components/AuthenticateButton.vue'
import inc from '@/components/inc.vue'
import NewWeight from '@/components/NewWeight.vue'
import Vue from 'vue'
import {startCase as _startCase} from 'lodash'

export default {
  name: 'Weights',
  components: {
    AuthenticateButton,
    NewWeight,
    inc
  },
  data () {
    return {
      weights: competitionWeights
    }
  },
  methods: {
    remove (name) {
      Vue.delete(this.weights, name)
    },
    addNewWeight ({name, value}) {
      Vue.set(this.weights, name, value)
    },
    formattedName (name) {
      return _startCase(name)
    },
  }
}
</script>
