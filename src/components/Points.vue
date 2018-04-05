<template>
  <div class="points">
    <h1>{{title}}</h1>

    <ul>
      <li v-for="teamName in teamNames" :key="teamName">
        {{teamName}}: {{teamScores[teamName]}}
      </li>
    </ul>
    <table align="center">
      <tr>
        <th>
          <input
            v-model.trim="newCompetition.name"
            placeholder="Competition Name"
            @keyup.enter="addCompetition"
          >
        </th>
        <th>
          <input
            v-model.trim="newCompetition.winningTeam"
            placeholder="Winning Team"
            @keyup.enter="addCompetition"
          >
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

export default {
  name: 'Points',
  components: {
    CompetitionRow
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
      teamNames: names
    }
  },
  computed: {
    teamScores () {
      return this.competitions.reduce((acc, {winningTeam, pointsAwarded}) => {
        acc[winningTeam] = (acc[winningTeam] || 0) + pointsAwarded
        return acc
      }, {})
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

table {
    border-collapse: collapse;
    width: 50%;
}

td, th {
    border: 0px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
