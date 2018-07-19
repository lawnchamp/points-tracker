<template>
  <div class="text-xs">
    <div v-if="isAdmin" class="py-1">
      State:
      <select :value="approvalState" @change="$emit('state-change', $event.target.value)" class="text-grey-dark">
        <option>submitted</option>
        <option>approved</option>
        <option>published</option>
      </select>
    </div>
    <div>
      <div v-if="isAdmin && submittedBy" class="py-1">
        Owner: <div class="inline text-grey-dark">{{submittedBy.email}}</div>
      </div>
      <div v-if="notes" class="py-1">
        Notes: <div class="inline text-grey-dark">{{ notes }}</div>
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
