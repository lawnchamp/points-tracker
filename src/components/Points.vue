<template>
  <div class="points container md:w-1/2 lg:w-1/3">
    <h2>{{title}}</h2>
    <div class="pb-4">
      <TeamChart :chart-data="graphData"/>
    </div>

    <!-- pading on the right side of the competition name input is broken -->
    <multiselect
      class="py-1 px-1"
      v-model="newCompetition.name"
      placeholder='Competition'
      :options="competitionNames"
    />
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.winner"
        placeholder='Winner'
        :options="teamNames"
      />
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.loser"
        placeholder='Loser'
        :options="teamNames"
      />
    </span>
    <input
      class="rounded-lg text-blue-black py-3 px-2"
      v-model.trim="newCompetition.pointsAwarded"
      placeholder="Points Awarded"
      @keyup.enter="addCompetition"
    >
    <div class="">
      <CompetitionRow
      v-for="({name, winner, loser, pointsAwarded}, index) in competitions"
      v-bind="{name, winner, loser, pointsAwarded}"
      :key="index"
      @remove-competition="removeCompetition(index)"
      />
    </div>
  </div>
</template>

<script>
import names from '@/data/teamNames.js'
import seedCompetitions from '@/data/seedCompetitions.js'
import CompetitionRow from '@/components/CompetitionRow.vue'
import competitionWeights from '@/data/competitionWeights.js'
import Multiselect from 'vue-multiselect'
import {startCase as _startCase} from 'lodash'
import TeamChart from '@/TeamChart.js'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'Points',
  components: {
    Multiselect,
    CompetitionRow,
    TeamChart
  },
  data () {
    return {
      title: 'Points',
      competitions: [],
      newCompetition: {
        name: '',
        winner: '',
        loser: '',
        pointsAwarded: ''
      },
      message: 'hello!',
      teamNames: names,
      selectedFromDropdown: null
    }
  },
  computed: {
    teamScores () {
      return this.competitions.reduce((acc, {winner, pointsAwarded}) => {
        acc[winner] = (acc[winner] || 0) + pointsAwarded
        return acc
      }, {})
    },
    competitionNames () {
      return Object.keys(competitionWeights).map(competitionName => _startCase(competitionName))
    },

    // Can this logic be pushed into TeamChart.js while keeping the chart reactive?
    graphData () {
      return {
        labels: Object.keys(this.teamScores),
        datasets: [{
          label: 'team points',
          backgroundColor: [
            '#000000',
            '#3490DC',
            '#FF0000',
            '#800080',
            '#38C172',
            '#F6993F'
          ],
          data: Object.values(this.teamScores)
        }]
      }
    }
  },
  created () {
    this.competitions = [...seedCompetitions]
  },
  methods: {
    addCompetition () {
      if (!this.validCompetition(this.newCompetition)) {
        return
      }

      this.competitions.unshift({
        name: this.newCompetition.name,
        winner: this.newCompetition.winner,
        loser: this.newCompetition.loser,
        pointsAwarded: parseInt(this.newCompetition.pointsAwarded, 10)
      })

      this.newCompetition.name = ''
      this.newCompetition.winner = ''
      this.newCompetition.loser = ''
      this.newCompetition.pointsAwarded = ''
    },
    optionSelected (selected) {
      this.selectedFromDropdown.push(selected)
    },

    // this method should trigger some user feedback so they know why
    // data input isn't working
    //
    // should this be a computed?
    validCompetition (competition) {
      return this.validTeamName(competition.winner) && !this.missingCompetitionData(competition)
    },
    validTeamName (teamName) {
      return this.teamNames.includes(teamName)
    },
    missingCompetitionData (competition) {
      return competition.name === '' || competition.winner === '' || competition.loser === '' || competition.pointsAwarded === ''
    },
    removeCompetition (index) {
      this.competitions.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
