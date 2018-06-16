<template>
  <div>
    <TeamChart :chart-data="graphData"/>
  </div>
</template>

<script>

import TeamChart from '@/TeamChart.js'

export default {
  name: 'GraphWrapper',
  components: {
    TeamChart
  },
  props: {
    teamScores: {
      required: true,
      type: Object
    }
  },
  computed: {
    graphData () {
      return {
        labels: Object.keys(this.teamScores),
        datasets: [{
          label: 'team points',
          backgroundColor: Object.keys(this.teamScores),
          data: Object.values(this.teamScores)
        }]
      }
    }
  }
}
</script>
