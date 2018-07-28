<template>
  <div id="app" class="bg-grey-lighter">
    <SiteHeader/>
    <router-view/>
  </div>
</template>

<script>
import './styles/app.scss'
import SiteHeader from '@/components/SiteHeader.vue'

export default {
  name: 'app',
  components: { SiteHeader },
  created () {
    this.$store.dispatch('getAllCompetitions')
  },
  computed: {
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  }
}
</script>
