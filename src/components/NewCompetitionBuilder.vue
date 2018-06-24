<template>
  <div  class="py-8">
    <h3 class="">Add a new competition</h3>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.name"
        placeholder='Competition'
        :options="competitionNames"
        :show-labels="false"
        @close=addCompetition
      />
    </span>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.winner"
        :placeholder="firstTeamPlaceholder"
        :options="teamNames"
        :show-labels="false"
        @close=addCompetition
      />
      <ul class="list-reset">
        <li>
          <input type="radio" :value="false" v-model="newCompetition.tied">
          <label for="beat" class="text-xs px-1">Beat</label>
        </li>
        <li>
          <input type="radio" :value="true" v-model="newCompetition.tied">
          <label for="tied" class="text-xs px-1">Tied</label>
        </li>
      </ul>
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.loser"
        :placeholder='secondTeamPlaceholder'
        :options="teamNames"
        :show-labels="false"
        @close=addCompetition
      />
    </span>
  </div>
</template>

<script>
import names from '@/data/teamNames.js'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'NewCompetitionBuilder',
  components: {
    Multiselect
  },
  data () {
    return {
      newCompetition: {
        name: '',
        winner: '',
        loser: '',
        tied: false
      },
      teamNames: names,
      saving: false
    }
  },
  computed: {
    competitionNames () {
      return this.$store.getters.competitionNames
    },
    firstTeamPlaceholder () {
      return this.newCompetition.tied ? 'Team 1' : 'Winner'
    },
    secondTeamPlaceholder () {
      return this.newCompetition.tied ? 'Team 2' : 'Loser'
    }
  },
  methods: {
    addCompetition () {
      if (this.newCompetition.name === '' || this.newCompetition.winner === '' || this.newCompetition.loser === '') return

      this.saving = true

      this.$store.dispatch('addCompetition', this.newCompetition).then(() => {
        this.saving = false
        Object.keys(this.newCompetition).forEach(prop => { this.newCompetition[prop] = '' })
      }).catch((error) => {
        this.saving = false
        console.error('Error adding document: ', error)
      })
    }
  }
}
</script>
