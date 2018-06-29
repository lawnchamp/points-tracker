<template>
  <div id="app" class="bg-grey-lightest">
    <div v-if="adminSignedIn" id="nav">
      <router-link to="/points">Points</router-link> |
      <router-link to="/weights">Weights</router-link>
    </div>
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
    adminSignedIn () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
