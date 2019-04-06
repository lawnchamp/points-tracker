<template>
  <HideAndShowContainer v-if="canAddPoints" :initial-show="true">
    <template slot="title">
      <div v-if="isAdmin" class="inline">Add Competition</div>
      <div v-else-if="isLeader" class="inline font-semibold">
        Add points for <span :class="`text-${team} capitalize`">{{team}}</span> team
      </div>
    </template>
    <div class="overflow-visable">
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
          class="rounded border h-10 w-14 px-1 my-1 text-sm text-grey-darker"
          placeholder="Points"
          v-model.number="newCompetition.points"
        >
      </span>
      <span class="flex">
        <multiselect
          v-if="$store.getters.isAdmin"
          class="py-1 px-1"
          v-model="newCompetition.winner"
          :placeholder="firstTeamPlaceholder"
          :options="teamNames"
          :show-labels="false"
        />
        <div class="flex items-center">
          <input class="inline-block" type="checkbox" id="checkbox" v-model="newCompetition.tied">
          <label class="px-1 inline-block text-xs text-grey-dark uppercase" for="checkbox">tied</label>
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
          class="w-full py-2 px-3 mx-1 my-1 border rounded text-sm text-grey-darker"
          placeholder="Notes">
        </textarea>
      </span>
      <div class="h-8">
        <button
          style="float:right;"
          class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-green text-green hover:bg-green hover:text-white"
          @click="addCompetition"
        >{{saving ? 'Saving' : 'Submit'}}</button>
      </div>
    </div>
  </HideAndShowContainer>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import HideAndShowContainer from '@/components/HideAndShowContainer.vue'

export default {
  name: 'NewCompetitionBuilder',
  components: {
    HideAndShowContainer,
    Multiselect
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
      saving: false,
      show: true,
      teamNames: ['black', 'blue', 'brown', 'green', 'grey', 'lime', 'orange', 'pink', 'purple', 'red', 'turquoise', 'yellow']
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
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    isLeader () {
      return this.$store.getters.isLeader
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
  },
  created () {
    this.$store.dispatch('getWeights')
  }
}
</script>
