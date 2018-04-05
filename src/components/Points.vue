<template>
  <div class="points">
    <h1>{{title}}</h1>
    <div class="chart">
      <TeamChart :chart-data="graphData"/>
    </div>

    <p/>  <!-- how do you normally just add space? -->

    <table align="center">
      <tr>
        <th>
          <multiselect
            v-model="newCompetition.name"
            placeholder='Competition'
            :options="competitionNames"
          />
        </th>
        <th>
          <multiselect
            v-model="newCompetition.winningTeam"
            placeholder='Winning Team'
            :options="teamNames"
          />
        </th>
        <th>
          <input
            v-model.trim="newCompetition.pointsAwarded"
            placeholder="Points Awarded"
            @keyup.enter="addCompetition"
          >
        </th>
      </tr>
      <CompetitionRow
        v-for="({name, winningTeam, pointsAwarded}, index) in competitions"
        v-bind="{name, winningTeam, pointsAwarded}"
        :key="index"
        @remove-competition="removeCompetition(index)"
      />
    </table>
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
        winningTeam: '',
        pointsAwarded: ''
      },
      message: 'hello!',
      teamNames: names,
      selectedFromDropdown: null
    }
  },
  computed: {
    teamScores () {
      return this.competitions.reduce((acc, {winningTeam, pointsAwarded}) => {
        acc[winningTeam] = (acc[winningTeam] || 0) + pointsAwarded
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
            '#4084dd',
            '#cc0a33',
            '#800080',
            '#A52A2A',
            '#FFA500'
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

      this.competitions.push({
        name: this.newCompetition.name,
        winningTeam: this.newCompetition.winningTeam,
        pointsAwarded: parseInt(this.newCompetition.pointsAwarded, 10)
      })

      this.newCompetition.name = ''
      this.newCompetition.winningTeam = ''
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
      return this.validTeamName(competition.winningTeam) && !this.missingCompetitionData(competition)
    },
    validTeamName (teamName) {
      return this.teamNames.includes(teamName)
    },
    missingCompetitionData (competition) {
      return competition.name === '' || competition.winningTeam === '' || competition.pointsAwarded === ''
    },
    removeCompetition (index) {
      this.competitions.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!-- what is the proper way to do this style script -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.chart {
  width: 50%;
  margin: 0 auto;
}

table {
    border-collapse: collapse;
    width: 50%;
}

th {
    text-align: left;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
