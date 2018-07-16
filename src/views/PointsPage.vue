<template>
  <div class="font-sans text-grey-darkest leading tight">
    <header class="bg-black antialiased pb-32">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4 border-b border-grey-darkest">
          <div class="flex items-center">
            <svg class="text-grey-lighter h-8 w-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M1 10h3v10H1V10zM6 0h3v20H6V0zm5 8h3v12h-3V8zm5-4h3v16h-3V4z"/></svg>
            <div class= "font-semibold text-2xl text-grey-darker antialiased px-4 pt-3">
              {{ campTitle }}
            </div>
          </div>
          <div>
            <AuthenticateButton/>
          </div>
        </div>
        <nav class="flex py-2" v-if="isAdmin">
          <router-link class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white" to="/points">Points</router-link>
          <router-link class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white" to="/weights">Weights</router-link>
          <router-link class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white" to="/Teams">Teams</router-link>
        </nav>
      </div>
    </header>

    <div class="container mx-auto max-w-md px-4 -mt-32 py-1">
      <div class="bg-white rounded-lg shadow p-2 ">
        <div v-if="isAdmin" class="container mx-auto">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div v-for="state in graphState.all" :key="state">
                <div @click="setGraphApprovalState(state)" :class="graphStateStyling(state)">{{ state }}</div>
              </div>
            </div>
            <svg @click="animateApprovedScores" class="text-grey-light h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6l8 4-8 4V6z"/></svg>
          </div>
        </div>
        <GraphWrapper :teamScores="teamScores"></GraphWrapper>
      </div>
    </div>

    <HideAndShowContainer v-if="canAddPoints" :initial-show="true">
      <template slot="title">
        <div v-if="isAdmin" class="inline font-semibold">Add Competition</div>
        <div v-else-if="isLeader" class="inline font-semibold">
          Add points for <span :class="`text-${currentUserTeam} capitalize`">{{currentUserTeam}}</span> team
        </div>
      </template>
      <NewCompetitionBuilder v-if="canAddPoints" :teamNames="teamNames"></NewCompetitionBuilder>
    </HideAndShowContainer>

    <HideAndShowContainer v-if="canAddPoints" v-for="state in ['submitted', 'approved', 'published']" :key="state">
      <template slot="title">
        <div class="flex justify-between items-center">
          <div>
            {{state}}
          </div>
          <div v-if="state === 'approved'">
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
      <CompetitionRow
        v-for="competition in orderedCompetitions.filter(comp => comp.approvalState === state)"
        v-bind="competition"
        :key="competition.id"
        @remove-competition="removeCompetition(competition.id)"
      />
    </HideAndShowContainer>
    <HideAndShowContainer v-show="!canAddPoints" :initial-show="true">
      <template slot="title">Points</template>
      <CompetitionRow
        v-for="competition in orderedCompetitions.filter(comp => comp.approvalState === 'published')"
        v-bind="competition"
        :key="competition.id"
      />
    </HideAndShowContainer>
    <!-- <div class="container">
      <h3>Sort by</h3>
      <div class="inline-flex py-1 px-1 justify-center" v-for="team in teamNames" :key="team">
        <button @click="selectedTeamSort = team"
                :class="stylingForTeam(team)"
                class="h-6 w-14 rounded-full text-xs capitalize">{{team}}</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import AuthenticateButton from '@/components/AuthenticateButton.vue'
import GraphWrapper from '@/components/GraphWrapper.vue'
import HideAndShowContainer from '@/components/HideAndShowContainer.vue'
import CompetitionRow from '@/components/CompetitionRow.vue'
import NewCompetitionBuilder from '@/components/NewCompetitionBuilder.vue'
import Vue from 'vue'

import {sortBy as _sortBy} from 'lodash'

export default {
  name: 'PointsPage',
  components: {
    AuthenticateButton,
    CompetitionRow,
    GraphWrapper,
    HideAndShowContainer,
    NewCompetitionBuilder
  },
  data () {
    return {
      graphState: {
        all: ['submitted', 'approved', 'published'],
        selected: ['published']
      },
      campTitle: 'Worthy 18',
      selectedTeamSort: null
    }
  },
  computed: {
    competitions () {
      return this.$store.state.competitions
    },
    canAddPoints () {
      return this.isAdmin || this.$store.getters.isLeader
    },
    teamScores () {
      return this.competitions.reduce((acc, {winner, points, approvalState, tied}) => {
        if (this.graphState.selected.includes(approvalState)) {
          const divisor = tied ? 2 : 1
          acc[winner] = (acc[winner] || 0) + ((points || 0) / divisor)
        }
        return acc
      }, {})
    },
    teamSortBy () {
      return this.selectedTeamSort || this.currentUserTeam
    },
    orderedCompetitions () {
      return _sortBy(this.competitions, [(competition) => (competition.winner !== this.teamSortBy)])
    },
    teamNames () {
      return Object.keys(this.teamScores)
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    isLeader () {
      return this.$store.getters.isLeader
    },
    currentUserTeam () {
      return this.$store.getters.currentUserTeam
    }
  },

  methods: {
    setGraphApprovalState (state) {
      const index = this.graphState.selected.indexOf(state)
      if (index !== -1) {
        // question - is Vue.delete needed?
        Vue.delete(this.graphState.selected, index)
      } else {
        this.graphState.selected.push(state)
      }
    },
    graphStateStyling (state) {
      return `px-2 text-sm ${this.graphState.selected.includes(state) ? 'text-grey-dark border border-grey-dark rounded-full' : 'text-grey-light'}`
    },
    animateApprovedScores () {
      alert('coming soon :)')
      console.log('redraw graph starting with published scores then slowly add approved')
      console.log('or possibly make this the publish all button')
    },
    stylingForTeam (team) {
      return team === this.teamSortBy ? `text-${team} border-2 border-${team}` : 'text-grey-dark border border-grey-dark'
    },
    removeCompetition (id) {
      this.$store.dispatch('removeCompetition', id)
    },
    publishAll () {
      this.$store.dispatch('publishAll')
    }
  }
}
</script>
