<template>
  <HideAndShowContainer :initialShow="true">
    <template slot="title">
      <div v-if="isAdmin" class="inline">Add Competition</div>
      <div v-else-if="isLeader" class="inline font-semibold">
        Add points for <span :class="`text-${team} capitalize`">{{ team }}</span> team
      </div>
    </template>
    <div>
      <span class="flex">
        <multiselect
          v-model="newCompetition.name"
          :options="competitionNames"
          :showLabels="false"
          placeholder="Competition"
          class="py-1 px-1"
          @input="initializePoints"
        />
        <input
          v-model.number="newCompetition.points"
          placeholder="Points"
          class="rounded border h-10 w-14 px-1 my-1 text-sm text-grey-darker"
        >
      </span>
      <span class="flex">
        <multiselect
          v-if="isAdmin"
          v-model="newCompetition.winner"
          :placeholder="firstTeamPlaceholder"
          :options="teamNames"
          :showLabels="false"
          class="py-1 px-1"
        />
        <div class="flex items-center">
          <input id="checkbox" v-model="newCompetition.tied" class="inline-block" type="checkbox">
          <label class="px-1 inline-block text-xs text-grey-dark uppercase" for="checkbox">tied</label>
        </div>
        <multiselect
          v-model="newCompetition.loser"
          :placeholder="secondTeamPlaceholder"
          :options="[...teamNames, 'n/a']"
          :showLabels="false"
          class="py-1 px-1"
        />
      </span>
      <span class="flex justify-between items-center">
        <textarea
          v-model="newCompetition.notes"
          type="text"
          class="w-full py-2 px-3 mx-1 my-1 border rounded text-sm text-grey-darker"
          placeholder="Notes">
        </textarea>
      </span>
      <div class="h-8">
        <button
          style="float:right;"
          class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-green text-green hover:bg-green hover:text-white"
          @click="addCompetition"
        >{{ saving ? 'Saving' : 'Submit' }}</button>
      </div>
    </div>
  </HideAndShowContainer>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import HideAndShowContainer from '@/components/HideAndShowContainer.vue'
import {TEAM_NAMES} from '@/store.js'

export default {
  name: 'NewCompetitionBuilder',
  components: {
    HideAndShowContainer,
    Multiselect,
  },
  data() {
    return {
      newCompetition: {
        name: '',
        winner: '',
        loser: '',
        points: null,
        defaultPoints: 0,
        tied: false,
        notes: '',
      },
      saving: false,
      show: true,
      teamNames: TEAM_NAMES,
    }
  },
  computed: {
    team() {
      return this.$store.getters.currentUserTeam
    },
    competitionNames() {
      return this.$store.getters.competitionNames
    },
    firstTeamPlaceholder() {
      return this.newCompetition.tied ? 'Team 1' : 'Winner'
    },
    secondTeamPlaceholder() {
      return this.newCompetition.tied ? 'Team 2' : 'Loser'
    },
    weights() {
      return this.$store.state.weights
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isLeader() {
      return this.$store.getters.isLeader
    },
  },
  created() {
    this.$store.dispatch('getWeights')
  },
  methods: {
    addCompetition() {
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
    initializePoints() {
      this.newCompetition.defaultPoints = this.weights[this.newCompetition.name]
      this.newCompetition.points = this.weights[this.newCompetition.name]
    },
    resetNewCompetitionData() {
      this.newCompetition = {
        name: '',
        winner: this.team,
        loser: '',
        points: '',
        defaultPoints: '',
        tied: false,
        notes: '',
      }
    },
  },
}
</script>
