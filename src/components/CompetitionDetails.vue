<template>
  <div class="text-xs">
    <div v-if="isAdmin">
      State:
      <select :value="approvalState" @change="$emit('state-change', $event.target.value)" class="text-grey">
        <option>submitted</option>
        <option>approved</option>
        <option>published</option>
      </select>
    </div>
    <div>
      <div v-if="isAdmin && submittedBy">
        Owner: <div class="text-grey-dark inline">{{submittedBy.email}}</div>
      </div>
      <div v-if="notes">
        Notes: <div class="text-grey-dark inline">{{ notes }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitionDetails',
  props: {
    isAdmin: {
      type: Boolean,
      required: true
    },
    approvalState: {
      type: String,
      required: true
    },
    submittedBy: {
      type: Object,
      required: true
    },
    notes: {
      type: String,
      required: false
    }
  }
}
</script>
