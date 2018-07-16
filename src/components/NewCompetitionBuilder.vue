<template>
  <div>
    <h3 v-if="$store.getters.isAdmin">Add new points</h3>
    <h3 v-else-if="$store.getters.isLeader">
      Add points for <span :class="`text-${team} uppercase`">{{team}}</span> team
    </h3>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.name"
        placeholder='Competition'
        :options="competitionNames"
        :show-labels="false"
        @input="initializePoints"
      />
      <input
        class="rounded border h-10 w-14 px-1 my-1"
        placeholder="Points"
        type="text"
        v-model.number="newCompetition.points"
      >
    </span>
    <span class="flex">
      <multiselect
        v-if="$store.getters.isAdmin"
        class="py-1 px-1"
        v-model="newCompetition.winner"
        :placeholder="firstTeamPlaceholder"
        :options="[...teamNames, 'turquoise', 'pink']"
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
    <span class="flex justify-between items-center">
      <textarea
        type="text"
        v-model="newCompetition.notes"
        class="width-64 py-2 px-3 mx-1 my-1 border rounded"
        placeholder="Notes">
      </textarea>
      <button
        class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-green text-green hover:bg-green hover:text-white"
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
        points: null,
        defaultPoints: 0,
        tied: false,
        notes: ''
      },
      saving: false
    }
  },
  computed: {
    team () {
      return this.$store.getters.currentUserTeam
    },
    competitionNames () {
      return this.$store.getters.competitionNames
    },
    firstTeamPlaceholder () {
      return this.newCompetition.tied ? 'Team 1' : 'Winner'
    },
    secondTeamPlaceholder () {
      return this.newCompetition.tied ? 'Team 2' : 'Loser'
    },
    weights () {
      return this.$store.state.weights
    },
    canAddPoints () {
      return this.$store.getters.isAdmin || this.$store.getters.isLeader
    }
  },
  methods: {
    addCompetition () {
      if (this.newCompetition.name === '') return

      this.saving = true
      if (this.newCompetition.winner === '') this.newCompetition.winner = this.team

      this.$store.dispatch('addCompetition', this.newCompetition).then(() => {
        this.saving = false
        this.resetNewCompetitionData()
      }).catch((error) => {
        this.saving = false
        console.error('Error adding document: ', error)
        this.resetNewCompetitionData()
      })
    },
    initializePoints () {
      this.newCompetition.defaultPoints = this.weights[this.newCompetition.name]
      this.newCompetition.points = this.weights[this.newCompetition.name]
    },
    resetNewCompetitionData () {
      this.newCompetition = {
        name: '',
        winner: this.team,
        loser: '',
        points: '',
        defaultPoints: '',
        tied: false,
        notes: ''
      }
    }
  }
}
</script>
