<template>
  <header class="bg-black antialiased pb-32">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4 border-b border-grey-darkest">
        <div class="flex items-center" @click="$router.replace('/')">
          <svg class="text-grey-lighter h-8 w-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M1 10h3v10H1V10zM6 0h3v20H6V0zm5 8h3v12h-3V8zm5-4h3v16h-3V4z" /></svg>
          <div class="font-semibold text-2xl text-grey-darker antialiased px-4 pt-3">
            {{ campTitle }}
          </div>
        </div>
        <div>
          <DropdownMenu></DropdownMenu>
        </div>
      </div>
      <nav v-if="isAdmin" class="flex py-2">
        <router-link class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white" to="/points">Points</router-link>
        <router-link class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white" to="/weights">Weights</router-link>
        <router-link class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white" to="/users">Users</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu.vue'

export default {
  components: {DropdownMenu},
  data() {
    return {
      campTitle: 'YouthCamp 2019',
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
  },
}
</script>
