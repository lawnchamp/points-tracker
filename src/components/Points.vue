<template>
  <div class="points container md:w-1/2 lg:w-1/3">
    <h2>{{title}}</h2>
    <div class="pb-4">
      <TeamChart :chart-data="graphData"/>
    </div>

    <!-- this needs to be a component -->
    <div v-if="adminMode">
      <!-- pading on the right side of the competition name input is broken -->
      <p>Add a new competition</p>
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
    </div>

    <div class="container">
      <p>sort by:</p>
      <div class="inline-flex py-1 px-1 justify-center" v-for="team in teamNames" :key="team">
        <button @click="selectedTeamSort = team"
                :class="`bg-${team}`"
                class="h-6 w-12 rounded-full text-xs text-white">{{team}}</button>
      </div>
    </div>

    <div v-show="saving">
      saving...
    </div>

    <!-- I don't know why i need to call parseInt(). pointsAwarded is already a number -->
    <CompetitionRow
      v-for="({id, name, winner, loser, pointsAwarded}, index) in orderedCompetitions"
        v-bind="{name, winner, loser}"
        :pointsAwarded="parseInt(pointsAwarded, 10)"
        :key="id"
        @remove-competition="removeCompetition(index, id)"
    />
  </div>
</template>

<script>
import names from '@/data/teamNames.js'
import CompetitionRow from '@/components/CompetitionRow.vue'
import competitionWeights from '@/data/competitionWeights.js'
import Multiselect from 'vue-multiselect'
import {
  startCase as _startCase,
  sortBy as _sortBy
} from 'lodash'
import TeamChart from '@/TeamChart.js'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import firebase from '@/firebase.js'

export default {
  name: 'Points',
  components: {
    Multiselect,
    CompetitionRow,
    TeamChart
  },
  data () {
    return {
      db: {},
      title: 'Points',
      competitions: [], // this should be a hash indexed by firebase id
      adminMode: true,
      newCompetition: {
        id: '',
        name: '',
        winner: '',
        loser: '',
        pointsAwarded: ''
      },
      teamNames: names,
      selectedFromDropdown: null,
      saving: false,
      selectedTeamSort: ''
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
          backgroundColor: Object.keys(this.teamScores),
          data: Object.values(this.teamScores)
        }]
      }
    },
    orderedCompetitions () {
      return _sortBy(this.competitions, [(competition) => { return (competition.winner !== this.selectedTeamSort) }])
    }
  },

  created () {
    this.db = firebase.firestore()
    this.db.collection('competitions').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.competitions.push({
          id: doc.id,
          name: doc.data().name,
          winner: doc.data().winner,
          loser: doc.data().loser,
          pointsAwarded: doc.data().pointsAwarded
        })
      })
    })
  },

  methods: {
    addCompetition () {
      if (!this.validCompetition(this.newCompetition)) {
        return
      }

      // save data on remote db
      this.saving = true
      this.db.collection('competitions').add({
        name: this.newCompetition.name.toLowerCase(),
        winner: this.newCompetition.winner,
        loser: this.newCompetition.loser,
        pointsAwarded: parseInt(this.newCompetition.pointsAwarded, 10)
      }).then((docRef) => {
        this.saving = false

        this.competitions.unshift({
          id: docRef.id,
          name: this.newCompetition.name,
          winner: this.newCompetition.winner,
          loser: this.newCompetition.loser,
          pointsAwarded: parseInt(this.newCompetition.pointsAwarded, 10)
        })

        this.newCompetition.name = ''
        this.newCompetition.winner = ''
        this.newCompetition.loser = ''
        this.newCompetition.pointsAwarded = ''
      }).catch((error) => {
        this.saving = false
        console.error('Error adding document: ', error)
      })
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
    removeCompetition (index, id) {
      this.saving = true
      this.db.collection('competitions').doc(id).delete()
        .then(() => {
          if (this.competitions[index].id === id) {
            this.competitions.splice(index, 1)
          } else {
            console.log('race condition! using longer remove')
            this.competitions = this.competitions.filter(competition => competition.id !== id)
          }
          this.saving = false
        }).catch((error) => {
          this.saving = false
          console.error('Error removing document: ', error)
        })
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
