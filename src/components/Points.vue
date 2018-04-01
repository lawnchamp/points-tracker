<template>
  <div class="points">
    <h1>{{title}}</h1>
    <input
      v-model.trim="newCompetition.name"
      placeholder="Competition Name"
      @keyup.enter="addCompetition"
    >
    <input
      v-model.trim="newCompetition.winningTeam"
      placeholder="Winning Team"
      @keyup.enter="addCompetition"
    >
    <input
      v-model.trim="newCompetition.pointsAwarded"
      placeholder="Points Awarded"
      @keyup.enter="addCompetition"
    >

    {{competitions}}
  </div>
</template>

<script>
export default {
  name: 'Points',
  data: function() {
    return {
        title: 'Points',
        competitions: [],
        newCompetition: {
          name: '',
          winningTeam: '',
          pointsAwarded: '', 
        }
    };
  },
  methods: {
    // How can this be tested?
    addCompetition() {
      this.competitions.push({
        name: this.newCompetition.name,
        winningTeam: this.newCompetition.winningTeam,
        pointsAwarded: parseInt(this.newCompetition.pointsAwarded, 10),
      })

      // can this be cleared faster? feels verbose
      this.newCompetition.name = '';
      this.newCompetition.winningTeam = '',
      this.newCompetition.pointsAwarded = '';
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
</style>
