<template>
  <tr class="text-left">
    <td class="p-2">{{name}}</td>
    <td>{{winningTeam}}</td>
    <td>
      {{pointsAwarded}}
      <button class="hover:bg-blue-dark text-white py-2 px-4 rounded float-right" @click="$emit('remove-competition')">remove</button>
    </td>
  </tr>
</template>

<script>

export default {
  name: 'CompetitionRow',
  props: {
    name: String,
    winningTeam: String,
    pointsAwarded: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
