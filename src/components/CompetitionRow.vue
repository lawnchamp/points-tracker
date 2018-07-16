<template>
  <div v-if="userCanSeeCompetition" class="relative text-left m-3 bg-white rounded-lg py-2 px-1 shadow-md">
    <button v-if="isAdmin"
      class="btn-close"
      @click="$emit('remove-competition')"
    >x</button>
    <div class="p-2">
      <div class="flex justify-between">
        <div class="flex">
          <div class="team-icon" v-bind:class="teamColor()"></div>
          <div class="px-3">
            <h3 class="capitalize">{{name}}</h3>
            <div class="text-s">
              {{loserText}}
              <div v-if="isAdmin" class="inline">
                <select :value="approvalState" @change="$emit('approval-state-change', {id: id, approvalState: $event.target.value})">
                  <option>submitted</option>
                  <option>approved</option>
                  <option>published</option>
                </select>
              </div>
              <div v-else-if="approvalState != 'published'" class="text-grey">
                {{approvalState}}
              </div>
              <div v-if="isAdmin && submittedBy">
                {{submittedBy.email}}
              </div>
            </div>
          </div>
        </div>
        <div class="flex self-center">
          <h2 :class="'px-2 ' + customValueIndicatorClass">
            {{pointsAwarded}}<sup v-if="usingCustomValue && isAdmin">*</sup>
          </h2>
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
    submittedBy: Object,
    loser: String,
    defaultPoints: Number,
    points: Number,
    id: String,
    approvalState: String,
    tied: Boolean
  },
  computed: {
    pointsAwarded () {
      return this.points / (this.tied ? 2 : 1)
    },
    customValueIndicatorClass () {
      return this.$store.getters.authenticatedUser && this.usingCustomValue ? 'italic text-blue-dark' : ''
    },
    usingCustomValue () {
      return this.defaultPoints && this.defaultPoints !== this.points
    },
    userCanSeeCompetition () {
      // choosing to view data in front end is dangerous, this can easily be faked
      if (this.approvalState === 'published') return true

      if (this.isAdmin) {
        return true
      } else {
        return this.$store.getters.currentUserTeam === this.winner
      }
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    loserText () {
      if (this.tied) {
        return `tied ${this.loser}`
      } else if (this.loser === 'n/a' || this.loser === '') {
        return ''
      } else {
        return `vs ${this.loser}`
      }
    }
  },
  methods: {
    approvalStateChange ({id, approvalState}) {
      // todo!! - just pass the id and new state to the store and let the store handle the rest
      // const updatingCompetition = this.competitions.find(comp => comp.id === id)
      // this.$store.dispatch('updateCompetition', {
      //   ...updatingCompetition,
      //   approvalState: approvalState
      // })
    },
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
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.btn-close {
  line-height: 15px;
  padding: 6px 8px;
  position: absolute;
  right: 0;
  opacity: 1;
  top: 0;
  color: lightgray;
  background: white;
  border-radius: 50%;
  font-weight: bold;
}
</style>
