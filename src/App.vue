<template>
  <div id="app" class="bg-grey-lightest">
    <router-view/>
  </div>
</template>

<script>
import './styles/app.scss'

export default {
  name: 'app'
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
</style>
