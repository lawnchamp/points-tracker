<template>
  <HideAndShowContainer v-if="canSeeContainer">
    <template slot="title">
      <div class="flex justify-between items-center">
        <div>
          {{state}}
        </div>
        <div v-if="state === 'approved'" class="-my-1">
          <button
            v-if="$store.getters.isAdmin"
            class="text-xs font-semibold rounded-full px-4 py-1
                  leading-normal bg-white border border-green text-green
                  hover:bg-green hover:text-white"
            @click="publishAll"
          >Publish all</button>
        </div>
      </div>
    </template>
    <div class="flex justify-between items-center">
      <div v-if="competitions.length == 0" class="font-semibold flex justify-between items-center">Empty</div>
    </div>
    <CompetitionRow
      v-for="competition in orderedCompetitions"
      v-bind="competition"
      :key="competition.id"
    />
  </HideAndShowContainer>
  <!-- <HideAndShowContainer v-show="!canAddPoints" :initial-show="true">
    <template slot="title">Points</template>
    <CompetitionRow
      v-for="competition in publishedCompetitions"
      v-bind="competition"
      :key="competition.id"
    />
  </HideAndShowContainer> -->
</template>

<script>
import HideAndShowContainer from '@/components/HideAndShowContainer.vue'
import CompetitionRow from '@/components/CompetitionRow.vue'
import {TEAM_NAMES} from '@/store.js'
import {sortBy as _sortBy} from 'lodash'
export default {
  components: {HideAndShowContainer, CompetitionRow},
  props: {
    state: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      teamNames: TEAM_NAMES,
      selectedTeamSort: null
    }
  },
  computed: {
    competitions () {
      return this.$store.state.competitions.filter((comp) => {
        const correctState = comp.approvalState === this.state

        const needToSelectByTeam = this.isLeader && this.state !== 'published'
        if (needToSelectByTeam) {
          return correctState && comp.winner === this.currentUserTeam
        } else {
          return correctState
        }
      })
    },
    isLeader () {
      return this.$store.getters.isLeader
    },
    currentUserTeam () {
      return this.$store.getters.currentUserTeam
    },
    orderedCompetitions () {
      return _sortBy(this.competitions, [(competition) => (competition.winner !== this.teamSortBy)])
    },
    teamSortBy () {
      return this.selectedTeamSort || this.$store.getters.currentUserTeam
    },
    canSeeContainer () {
      switch (this.state) {
        case 'submitted': return this.$store.getters.authenticatedUser
        case 'approved': return this.$store.getters.authenticatedUser
        case 'published': return true
      }
    }
  },
  methods: {
    publishAll () {
      this.$store.dispatch('publishAll')
    }
  }
}
</script>

<style>

</style>
