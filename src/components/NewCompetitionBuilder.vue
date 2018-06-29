<template>
  <div  class="py-8">
    <h3 class="">Add a new score</h3>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.name"
        placeholder='Competition'
        :options="competitionNames"
        :show-labels="false"
      />
    </span>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.winner"
        :placeholder="firstTeamPlaceholder"
        :options="teamNames"
        :show-labels="false"
      />
      <div>
        <input class="inline" type="checkbox" id="checkbox" v-model="newCompetition.tied">
        <label class="px-1 inline" for="checkbox">tied</label>
      </div>
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.loser"
        :placeholder='secondTeamPlaceholder'
        :options="[...teamNames, 'n/a']"
        :show-labels="false"
      />
    </span>
    <span class="flex-center">
      <button
        class="center text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-green text-green hover:bg-green hover:text-white"
        @click="addCompetition"
      >{{saving ? 'Saving' : 'Submit'}}</button>
    </span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'NewCompetitionBuilder',
  components: {
    Multiselect
  },
  props: {
    teamNames: Array
  },
  data () {
    return {
      newCompetition: {
        name: '',
        winner: '',
        loser: '',
        tied: false
      },
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
