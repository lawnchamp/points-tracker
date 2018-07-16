<template>
  <div class="container md:w-1/2 lg:w-1/3">
    <AuthenticateButton/>

    <NewCompetitionBuilder v-if="canAddPoints" :teamNames="teamNames"></NewCompetitionBuilder>

    <div class="bg-grey-lightest my-4">
      <GraphWrapper :teamScores="publishedTeamScores"></GraphWrapper>
    </div>

    <button
      v-if="isAdmin"
      class="h-8 text-xs font-semibold rounded-full px-4 py-1 my-1
             leading-normal bg-white border border-green text-green
             hover:bg-green hover:text-white"
      @click="publishAll"
    >Publish all approved points</button>

    <div class="container">
      <h3>Sort by</h3>
      <div class="inline-flex py-1 px-1 justify-center" v-for="team in teamNames" :key="team">
        <button @click="selectedTeamSort = team"
                :class="stylingForTeam(team)"
                class="h-6 w-14 rounded-full text-xs capitalize">{{team}}</button>
      </div>
    </div>

    <div v-show="saving">
      saving...
    </div>

    <CompetitionRow
      v-for="competition in orderedCompetitions"
        v-bind="competition"
        :key="competition.id"
        @remove-competition="removeCompetition(competition.id)"
        @approval-state-change="approvalStateChange"
    />
  </div>
</template>

<script>
import AuthenticateButton from '@/components/AuthenticateButton.vue'
import GraphWrapper from '@/components/GraphWrapper.vue'
import CompetitionRow from '@/components/CompetitionRow.vue'
import NewCompetitionBuilder from '@/components/NewCompetitionBuilder.vue'

import {sortBy as _sortBy} from 'lodash'

export default {
  name: 'PointsPage',
  components: {
    AuthenticateButton,
    CompetitionRow,
    NewCompetitionBuilder,
    GraphWrapper
  },
  data () {
    return {
      title: 'Points',
      saving: false,
      selectedTeamSort: null
    }
  },
  computed: {
    competitions () {
      return this.$store.state.competitions
    },
    canAddPoints () {
      return this.isAdmin || this.$store.getters.isLeader
    },
    publishedTeamScores () {
      return this.competitions.reduce((acc, {winner, points, approvalState, tied}) => {
        if (approvalState === 'published') {
          const divisor = tied ? 2 : 1
          acc[winner] = (acc[winner] || 0) + ((points || 0)/divisor)
        }
        return acc
      }, {})
    },
    teamSortBy () {
      return this.selectedTeamSort || this.$store.getters.currentUserTeam
    },
    orderedCompetitions () {
      return _sortBy(this.competitions, [(competition) => (competition.winner !== this.teamSortBy)])
    },
    teamNames () {
      return Object.keys(this.publishedTeamScores)
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },

  methods: {
    stylingForTeam (team) {
      return team === this.teamSortBy ? `text-${team} border-2 border-${team}` : 'text-grey-dark border border-grey-dark'
    },
    removeCompetition (id) {
      this.saving = true
      this.$store.dispatch('removeCompetition', id)
        .then(() => { this.saving = false })
    },
    },
    publishAll () {
      this.$store.dispatch('publishAll')
    }
  }
}
</script>
