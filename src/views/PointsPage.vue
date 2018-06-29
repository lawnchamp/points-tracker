<template>
  <div class="container md:w-1/2 lg:w-1/3">
    <AuthenticateButton/>

    <div class="bg-grey-lightest my-4">
      <GraphWrapper :teamScores="publishedTeamScores"></GraphWrapper>
    </div>

    <NewCompetitionBuilder v-if="adminSignedIn"></NewCompetitionBuilder>

    <div class="container">
      <h3>Sort by</h3>
      <div class="inline-flex py-1 px-1 justify-center" v-for="team in teamNames" :key="team">
        <button @click="selectedTeamSort = team"
                :class="stylingForTeam(team)"
                class="h-6 w-12 rounded-full text-xs capitalize">{{team}}</button>
      </div>
    </div>

    <div v-show="saving">
      saving...
    </div>

    <CompetitionRow
      v-for="competition in orderedCompetitions"
        v-bind="competition"
        :possiblePoints="weights[competition.name] || 0"
        :key="competition.id"
        @remove-competition="removeCompetition(competition.id)"
        @approval-state-change="approvalStateChange"
    />
  </div>
</template>

<script>
import AuthenticateButton from '@/components/AuthenticateButton.vue'
import GraphWrapper from '@/components/GraphWrapper.vue'
import names from '@/data/teamNames.js'
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
      teamNames: names,
      saving: false,
      selectedTeamSort: ''
    }
  },

  computed: {
    competitions () {
      return this.$store.state.competitions
    },
    weights () {
      return this.$store.state.weights
    },
    adminSignedIn () {
      return this.$store.getters.isAuthenticated
    },
    publishedTeamScores () {
      return this.competitions.reduce((acc, {winner, name, approvalState}) => {
        if (approvalState === 'published') {
          acc[winner] = (acc[winner] || 0) + (this.weights[name] || 0)
        }
        return acc
      }, {})
    },
    orderedCompetitions () {
      return _sortBy(this.competitions, [(competition) => (competition.winner !== this.selectedTeamSort)])
    }
  },

  methods: {
    stylingForTeam (team) {
      return team === this.selectedTeamSort ? `text-${team} border-2 border-${team}` : 'text-grey-dark border border-grey-dark'
    },
    removeCompetition (id) {
      this.saving = true
      this.$store.dispatch('removeCompetition', id)
        .then(() => { this.saving = false })
    },
    approvalStateChange ({id, approvalState}) {
      const updatingCompetition = this.competitions.find(comp => comp.id === id)
      this.$store.dispatch('updateCompetition', {
        ...updatingCompetition,
        approvalState: approvalState
      })
    }
  }
}
</script>
