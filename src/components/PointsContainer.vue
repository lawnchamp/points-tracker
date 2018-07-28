<template>
  <HideAndShowContainer>
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
    <CompetitionRow
      v-for="competition in orderedCompetitions"
      v-bind="competition"
      :key="competition.id"
    />
    <div v-if="competitions.length == 0">empty</div>
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
      selectedTeamSort: null
    }
  },
  computed: {
    competitions () {
      return this.$store.state.competitions.filter(comp => comp.approvalState === this.state)
    },
    orderedCompetitions () {
      return _sortBy(this.competitions, [(competition) => (competition.winner !== this.teamSortBy)])
    },
    teamSortBy () {
      return this.selectedTeamSort || this.$store.getters.currentUserTeam
    }
  }
}
</script>

<style>

</style>
