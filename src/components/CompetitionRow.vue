<template>
  <div v-if="userCanSee" class="text-left m-3 bg-white rounded-lg py-2 px-1 shadow-md">
    <div class="p-2">
      <div class="flex justify-between">
        <div class="flex">
          <div class="team-icon text-s" v-bind:class="teamColor()">{{winner}}</div>
          <div class="px-3">
            <h2 class="capitalize">{{name}}</h2>
            <div class="text-s">
              vs {{loser}}
              <div class="inline" v-if="tied"> - tied</div>
            </div>
            <div>
              <select :value="approvalState" @change="$emit('approval-state-change', {id: id, approvalState: $event.target.value})">
                <option>submitted</option>
                <option>approved</option>
                <option>published</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex self-center">
          <button
            class="text-xl float-right fill-current text-white hover:fill-current hover:text-black"
            @click="$emit('remove-competition')"
          >X</button>
          <h2 class="px-2">{{pointsAwarded}}</h2>
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
    id: String,
    approvalState: String,
    tied: Boolean
  },
  computed: {
    pointsAwarded () {
      return this.possiblePoints / (this.tied ? 2 : 1)
    },
    userCanSee () {
      // choosing to view data in front end is dangerous, this can easily be faked
      if (this.approvalState === 'published') return true
      if (this.$store.getters.currentUserRoll === 'admin') return true
      return false
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
