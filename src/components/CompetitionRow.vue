<template>
  <tr>
    <td>{{name}}</td>
    <td>{{winningTeam}}</td>
    <td>
      {{pointsAwarded}}
      <button class="removeButton" @click="$emit('remove-competition')">remove</button>
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
button {
  float: right;
}
td, th {
    border: 0px solid #dddddd;
    text-align: left;
    padding: 8px;
}
</style>
