<template>
  <div class="text-left m-3 bg-white shadow-lg rounded-lg py-2 px-1">
    <div class="p-2">
      <div class="flex justify-between">
        <div class="flex">
          <div class="team-icon text-s" v-bind:class="teamColor">{{winner}}</div>
          <div class="px-3">
            <h1 class="capitalize">{{name}}</h1>
            <div class="text-s">beat {{loser}}</div>
          </div>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            @click="$emit('remove-competition')"
          ><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
          <h4>{{pointsAwarded}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CompetitionRow',
  props: {
    name: String,
    winner: String.capitalize,
    loser: String,
    pointsAwarded: Number
  },
  data () {
    return {
      teamColor: `bg-${this.winner.toLowerCase()}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.team-icon {
    display: block;
    height: 60px;
    width: 60px;
    line-height: 60px;

    border-radius: 30px;

    color: white;
    text-align: center;
}
</style>
