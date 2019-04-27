<template>
  <HideAndShowContainer v-if="canSeeContainer">
    <template slot="title">
      <div class="flex justify-between items-center">
        <div>
          {{ state }}
        </div>
        <div v-if="state === 'approved'" class="-my-1">
          <button
            v-if="isAdmin"
            class="text-xs font-semibold rounded-full px-4 py-1
                  leading-normal bg-white border border-green text-green
                  hover:bg-green hover:text-white"
            @click="publishAll"
          >Publish all</button>
        </div>
      </div>
    </template>
    <div class="flex justify-between items-center">
      <div
        v-if="userViewableCompetitions.length == 0"
        class="font-semibold flex justify-between items-center py-2"
      >Empty</div>
    </div>
    <!-- <div class="inline-block relative w-64">
      <select class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option>Really long option that will likely overlap the chevron</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div> -->
    <select
      name="sort by"
      class="h-6 block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      @change="selectedTeamSort = $event.target.value"
    >
      <option v-for="team in teamNames" :value="team" :key="team" class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
        {{ team }}
      </option>
    </select>
    <CompetitionRow
      v-for="competition in orderedViewableCompetitions"
      v-bind="competition"
      :key="competition.id"
    />
  </HideAndShowContainer>
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
      return _sortBy(this.userViewableCompetitions, [competition => (competition.winner !== this.teamSortBy)])
    },
    teamSortBy() {
      return this.selectedTeamSort || this.$store.getters.currentUserTeam
    },
    canSeeContainer() {
      switch (this.state) {
        case 'submitted': return this.$store.getters.authenticatedUser
        case 'approved': return this.$store.getters.authenticatedUser
        case 'published': return true
      }
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
