<template>
  <HideAndShowContainer v-if="canSeeContainer" :initialShow="guestViewingPublishedContainer">
    <template slot="title">
      <div class="flex justify-between items-center">
      </div>
    </template>
    <div class="flex justify-between items-center">
      <div
        v-if="userViewableCompetitions.length == 0"
        class="font-semibold flex justify-between items-center py-2"
      >Empty</div>
    </div>
    <!-- <select
      name="sort by"
      class="h-6 block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      @change="selectedTeamSort = $event.target.value"
    >
      <option v-for="team in teamNames" :value="team" :key="team" class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
        {{ team }}
      </option>
    </select> -->
    <CompetitionRow
      v-for="competition in orderedViewableCompetitions"
      v-bind="competition"
      :key="competition.id"
    />
    <PublishAllButton v-if="showPublishAll"/>
  </HideAndShowContainer>
</template>

<script>
import CompetitionRow from '@/components/CompetitionRow.vue'
import HideAndShowContainer from '@/components/HideAndShowContainer.vue'
import PublishAllButton from '@/components/PublishAllButton.vue'
import {TEAM_NAMES} from '@/store.js'
export default {
  components: {HideAndShowContainer, CompetitionRow, PublishAllButton},
  props: {
    state: {
      type: String,
      required: true,
    },
    competitionsByApprovalState: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      teamNames: TEAM_NAMES,
      selectedTeamSort: null,
    }
  },
  computed: {
    userViewableCompetitions() {
      return this.competitionsByApprovalState.filter((comp) => {
        if (this.isAdmin || this.state === 'published') {
          return true
        } else {
          return comp.winner === this.currentUserTeam
        }
      })
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    currentUserTeam() {
      return this.$store.getters.currentUserTeam
    },
    orderedViewableCompetitions() {
      const deepCopy = [...this.userViewableCompetitions]
      return deepCopy.sort(competition => competition.winner == this.teamSortBy ? -1 : 1)
    },
    teamSortBy() {
      return this.selectedTeamSort || this.currentUserTeam
    },
    canSeeContainer() {
      switch (this.state) {
        case 'submitted': return this.isAuthenticated
        case 'approved': return this.isAuthenticated
        case 'published': return true
      }
    },
    isAuthenticated() {
      return this.$store.getters.authenticatedUser
    },
    guestViewingPublishedContainer() {
      return this.isAuthenticated && this.state === 'published'
    },
    showPublishAll() {
      return !this.emptyContainer && this.state === 'approved' && this.isAdmin
    },
    emptyContainer() {
      return this.userViewableCompetitions.length == 0
    }
  },
  methods: {
    publishAll() {
      this.$store.dispatch('publishAll')
    },
  },
}
</script>

<style>

</style>
