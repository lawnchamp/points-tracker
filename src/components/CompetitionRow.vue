<template>
  <div class="text-left m-3 bg-white rounded-lg py-2 px-1 shadow-md">
    <div class="p-2">
      <div class="flex justify-between">
        <div class="flex">
          <div class="team-icon text-s" v-bind:class="teamColor()">{{winner}}</div>
          <div class="px-3">
            <h1 class="capitalize">{{name}}</h1>
            <div class="text-s">
              vs {{loser}}
              <div class="inline" v-if="tied"> - tied</div>
            </div>
          </div>
        </div>
        <div class="flex self-center">
          <h1 class="px-2">{{pointsAwarded}}</h1>
          <button
            class="text-xl float-right fill-current text-white hover:fill-current hover:text-black"
            @click="$emit('remove-competition')"
          >X</button>
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
    possiblePoints: Number,
    tied: Boolean
  },
  computed: {
    pointsAwarded () {
      return this.possiblePoints / (this.tied ? 2 : 1)
    }
  },
  methods: {
    teamColor () {
      return `bg-${this.winner.toLowerCase()}`
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
