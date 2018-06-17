<template>
  <div  class="py-8">
    <h3 class="">Add a new competition</h3>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.name"
        placeholder='Competition'
        :options="competitionNames"
        @close=addCompetition
      />
    </span>
    <span class="flex">
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.winner"
        placeholder='Winner'
        :options="teamNames"
        @close=addCompetition
      />
      <multiselect
        class="py-1 px-1"
        v-model="newCompetition.loser"
        placeholder='Loser'
        :options="teamNames"
        @close=addCompetition
      />
    </span>
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
        loser: ''
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
      if (this.newCompetition.name === '' || this.newCompetition.winner === '' || this.newCompetition.loser === '') return

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
