<template>
  <div  class="py-8">
    <h3 class="">Add a new competition</h3>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.name"
        placeholder='Competition'
        :options="competitionNames"
      />
    </span>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.winner"
        placeholder='Winner'
        :options="teamNames"
      />
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.loser"
        placeholder='Loser'
        :options="teamNames"
      />
    </span>
    <input
      class="rounded-lg text-blue-black py-3 px-2"
      v-model.number="newCompetition.pointsAwarded"
      placeholder="Points Awarded"
      @keyup.enter="addCompetition"
    >
  </div>
</template>

<script>
import names from '@/data/teamNames.js'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'NewCompetitionBuilder',
  components: {
    Multiselect
  },
  data () {
    return {
      newCompetition: {
        name: '',
        winner: '',
        loser: '',
        pointsAwarded: ''
      },
      teamNames: names,
      saving: false
    }
  },
  computed: {
    competitionNames () {
      return this.$store.getters.competitionNames
    }
  },
  methods: {
    addCompetition () {
      this.saving = true
      this.$store.dispatch('addCompetition', this.newCompetition).then(() => {
        this.saving = false

        Object.keys(this.newCompetition).forEach(prop => { this.newCompetition[prop] = '' })
      }).catch((error) => {
        this.saving = false
        console.error('Error adding document: ', error)
      })
    }
  }
}
</script>
