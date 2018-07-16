<template>
  <div id="app" class="bg-grey-lighter">
    <router-view/>
  </div>
</template>

<script>
import './styles/app.scss'

export default {
  name: 'app',
  created () {
    this.$store.dispatch('getCompetitions')
    this.$store.dispatch('getWeights')
  },
  computed: {
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  }
}
</script>
