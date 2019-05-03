<template>
  <div class="container mx-auto px-4 -mt-32">
    <div class="bg-white rounded-lg shadow max-w-md px-4 py-2">
      <div
        v-for="{id, team} in users"
        :key="`user-${id}`"
        class="flex justify-between py-4 border-b text-lg relative"
      >
        <div>
          {{ id }}
        </div>
        <input
          :value="team"
          type="text"
          class="px-3 w-20 text-right"
          @change="teamChange(team, $event.target.value)"
        />
        <button
          class="btn-close text-grey-light text-base"
          @click="remove(userId)"
        >x</button>
      </div>
      <!-- <NewUser @new-user="addUser"></newUser> -->
    </div>
  </div>
</template>

<script>

// import NewWeight from '@/components/NewWeight.vue'

export default {
  name: 'PointsPage',
  // components: {NewWeight},
  computed: {
    users() {
      return this.$store.state.users
    },
  },
  created() {
    // don't ask for new users everytime you visit users page
    this.$store.dispatch('getUsers')
  },
  methods: {
    remove(id) {
      this.$store.dispatch('removeUser', id)
    },
    addUser(newUser) {
      this.$store.dispatch('addUser', newUser)
    },
    teamChange(userId, updatedTeam) {
      this.$store.dispatch('teamChange', {userId, updatedTeam})
    },
  },
}
</script>

// <style scoped lang="scss">
.btn-close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
