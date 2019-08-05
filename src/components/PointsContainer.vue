<template>
  <HideAndShowContainer v-if="canSeeContainer" :initialShow="state == 'published'">
    <template slot="title">
      <div class="flex justify-between items-center">
        {{ state }}
        <SortDropdown v-if="possibleTeamsToSortBy.length > 1">
          <span slot="link" class="appearance-none flex items-center inline-block text-grey">
            <span class="mr-1">{{ teamSortBy }}</span>
            <svg class="h-4 w-4 text-grey" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
          <div slot="dropdown" class="bg-white shadow rounded border overflow-hidden">
            <div
              v-for="team in possibleTeamsToSortBy"
              :key="team"
              class="no-underline block px-4 py-3 border-b text-grey-darkest bg-white hover:text-white hover:bg-blue"
              @click="selectedTeamSort = team"
            >{{ team }}</div>
          </div>
        </SortDropdown>
      </div>
    </template>
    <div v-if="emptyContainer" class="font-semibold py-2">Empty</div>
    <CompetitionRow
      v-for="competition in orderedViewableCompetitions"
      v-bind="competition"
      :key="competition.id"
    />
    <PublishAllButton v-if="showPublishAll"/>
  </HideAndShowContainer>
</template>

<script>
import SortDropdown from '@/components/SortDropdown.vue'
import CompetitionRow from '@/components/CompetitionRow.vue'
import HideAndShowContainer from '@/components/HideAndShowContainer.vue'
import PublishAllButton from '@/components/PublishAllButton.vue'
import {TEAM_NAMES} from '@/store.js'
export default {
  components: {SortDropdown, HideAndShowContainer, CompetitionRow, PublishAllButton},
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
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    currentUserTeam() {
      return this.$store.getters.currentUserTeam
    },
    userViewableCompetitions() {
      return this.competitionsByApprovalState.filter((comp) => {
        if (this.isAdmin || this.state === 'published') {
          return true
        } else {
          return comp.winner === this.currentUserTeam
        }
      })
    },
    orderedViewableCompetitions() {
      const deepCopy = [...this.userViewableCompetitions]
      return deepCopy.sort(competition => competition.winner == this.teamSortBy ? -1 : 1)
    },
    teamSortBy() {
      return this.selectedTeamSort || this.currentUserTeam || 'sort by'
    },
    possibleTeamsToSortBy() {
      const teamNames = this.userViewableCompetitions.map(comp => comp.winner)
      return [...new Set(teamNames)]
    },
    canSeeContainer() {
      switch (this.state) {
        case 'submitted': return this.isLeaderOfAdmin
        case 'approved':  return this.isLeaderOfAdmin
        case 'published': return true
      }
    },
    isLeaderOfAdmin() {
      return this.$store.getters.isAdmin || this.$store.getters.isLeader
    },
    showPublishAll() {
      return !this.emptyContainer && this.state === 'approved' && this.isAdmin
    },
    emptyContainer() {
      return this.userViewableCompetitions.length == 0
    },
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
