<template>
  <div>
    <TeamChart :chart-data="graphData"/>
  </div>
</template>

<script>

import TeamChart from '@/TeamChart.js'
import {colors} from '@/../tailwind.js'
const NAME_INDEX = 0
const SCORE_INDEX = 1

export default {
  name: 'GraphWrapper',
  components: {
    TeamChart
  },
  props: {
    teamScores: {
      required: true,
      type: Object
    },
    sortByPoints: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    sortedTeamScoreInfo () {
      const sortByIndex = this.sortByPoints ? SCORE_INDEX : NAME_INDEX
      return Object.entries(this.teamScores).sort((a, b) => b[sortByIndex] - a[sortByIndex])
    },
    sortedNames () {
      return this.sortedTeamScoreInfo.map(scoreInfo => scoreInfo[NAME_INDEX])
    },
    sortedScores () {
      return this.sortedTeamScoreInfo.map(scoreInfo => scoreInfo[SCORE_INDEX])
    },
    graphData () {
      return {
        labels: this.sortedNames,
        datasets: [{
          label: 'team points',
          backgroundColor: this.sortedNames.map(color => colors[color]),
          data: this.sortedScores
        }]
      }
    }
  }
}
</script>
