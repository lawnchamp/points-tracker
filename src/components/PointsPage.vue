<template>
  <div class="container md:w-1/2 lg:w-1/3">
    <AuthenticateButton/>

    <h1 class="pt-4">{{title}}</h1>

    <div class="bg-grey-lightest my-4">
      <TeamChart :chart-data="graphData"/>
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

    <!-- I don't know why i need to call parseInt(). pointsAwarded is already a number -->
    <CompetitionRow
      v-for="({id, name, winner, loser, pointsAwarded}) in orderedCompetitions"
        v-bind="{name, winner, loser}"
        :pointsAwarded="parseInt(pointsAwarded, 10)"
        :key="id"
        @remove-competition="removeCompetition(id)"
    />
  </div>
</template>

<script>
import AuthenticateButton from '@/components/AuthenticateButton.vue'
import names from '@/data/teamNames.js'
import CompetitionRow from '@/components/CompetitionRow.vue'
import NewCompetitionBuilder from '@/components/NewCompetitionBuilder.vue'
import firebase from '@/firebase.js'

import {sortBy as _sortBy} from 'lodash'
import TeamChart from '@/TeamChart.js'

export default {
  name: 'PointsPage',
  components: {
    AuthenticateButton,
    CompetitionRow,
    NewCompetitionBuilder,
    TeamChart
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
    adminSignedIn () {
      return !!firebase.auth().currentUser
    },

    // Can this logic be pushed into TeamChart.js while keeping the chart reactive?
    graphData () {
      return {
        labels: Object.keys(this.teamScores),
        datasets: [{
          label: 'team points',
          backgroundColor: Object.keys(this.teamScores),
          data: Object.values(this.teamScores)
        }]
      }
    },
    teamScores () {
      return this.competitions.reduce((acc, {winner, pointsAwarded}) => {
        acc[winner] = (acc[winner] || 0) + pointsAwarded
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
    }
  }
}
</script>
