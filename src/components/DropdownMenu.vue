<template>
  <div class="relative">
    <button type="button" @click.prevent="show = !show">
      <img v-if="isAuthenticated" class="flex-no-shrink block h-10 w-10 border-2 border-grey-darker hover:border-white rounded-full" src="https://avatars0.githubusercontent.com/u/13643618?v=4" alt="">
      <svg v-else class="text-grey-dark flex-no-shrink block h-10 w-10 border-2 border-grey-darker hover:border-white rounded-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z"/></svg>
    </button>
    <div v-show="show" class="absolute pin-r w-16 bg-grey-lightest rounded z10 mask box-shadow">
      <div class="px-4 py-2 border rounded-t no-select">
        <h4 class="text-dark-softer flex-spaced flex-y-center">
          User name and emil
        </h4>
      </div>
      <div class="px-4 py-3 no-select border-r border-b border-l rounded-b">
        <h4 class="mb-2">Logout</h4>
        <p class="text-sm">some subtext</p>
      </div>
    </div>
    <!-- <AuthenticateButton/> -->
  </div>
</template>

<script>
import AuthenticateButton from '@/components/AuthenticateButton.vue'

export default {
  components: { AuthenticateButton },
  data () {
    return {
      show: false
    }
  }
}
</script>
