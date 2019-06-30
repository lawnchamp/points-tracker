<template>
  <div v-if="userCanSeeCompetition" class="relative border-b">
    <button v-if="isAdmin"
      class="btn-close text-grey-light"
      @click="removeCompetition"
    >x</button>
    <div class="py-2">
      <div class="flex justify-between" @click="showDetails = !showDetails">
        <div class="flex">
          <div :class="teamColoring" class="team-icon flex-no-shrink"></div>
          <div class="capitalize font-semibold text-xl px-2 pt-2">{{ name }}</div>
        </div>
        <div class="flex self-center">
          <div :class="'font-semibold text-2xl px-2 ' + customValueIndicatorClass">
            {{ pointsAwarded }}<sup v-if="usingCustomValue && isAdmin">*</sup>
          </div>
        </div>
      </div>
      <CompetitionDetails
        v-if="showDetails && canSeeDetails"
        v-bind="{isAdmin, approvalState, notes, submittedBy, loser, tied}"
        @state-change="approvalStateChange"
      ></CompetitionDetails>
    </div>

  </div>
</template>

<script>
import CompetitionDetails from '@/components/CompetitionDetails.vue'

export default {
  name: 'CompetitionRow',
  components: {
    CompetitionDetails,
  },
  props: {
    approvalState: {type: String, required: true},
    defaultPoints: {type: Number, required: true},
    id: {type: String, required: true},
    loser: {type: String, required: false, default: ''},
    name: {type: String, required: true},
    notes: {type: String, required: false, default: ''},
    points: {type: Number, required: true},
    submittedBy: {
      type: Object,
      required: true,
      validator: obj => obj.email || obj.displayName,
    },
    tied: {type: Boolean, required: true},
    winner: {type: String.capitalize, required: true},
  },
  data() {
    return {
      showDetails: false,
    }
  },
  computed: {
    pointsAwarded() {
      return this.points / (this.tied ? 2 : 1)
    },
    customValueIndicatorClass() {
      return this.$store.getters.authenticatedUser && this.usingCustomValue ? 'italic text-blue-dark' : ''
    },
    usingCustomValue() {
      return this.defaultPoints && this.defaultPoints !== this.points
    },
    userCanSeeCompetition() {
      // choosing to view data in front end is dangerous, this can easily be faked
      if (this.approvalState === 'published') return true

      if (this.isAdmin) {
        return true
      } else {
        return this.$store.getters.currentUserTeam === this.winner
      }
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    canSeeDetails() {
      return this.isAdmin || this.$store.getters.isLeader
    },
    teamColoring() {
      return `bg-${this.winner.toLowerCase()}`
    },
  },
  methods: {
    approvalStateChange(newApprovalState) {
      this.$store.dispatch('updateApprovalState', {id: this.id, newApprovalState: newApprovalState})
    },
    removeCompetition() {
      this.$store.dispatch('removeCompetition', this.id)
    },
  },
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
  position: absolute;
  right: 0;
  top: 0;
}
</style>
