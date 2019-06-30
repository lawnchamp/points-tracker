<template>
  <div class="text-xs font-bold">
    <div v-if="isAdmin" class="py-1">
      State:
      <select :value="approvalState" class="font-thin" @change="$emit('state-change', $event.target.value)">
        <option>submitted</option>
        <option>approved</option>
        <option>published</option>
      </select>
    </div>
    <div v-if="loser != ''" class="py-1">
      {{tied ? 'Tied:' : 'Loser:'}} <div class="inline font-thin">{{ loser }}</div>
    </div>
    <div v-if="isAdmin && submittedBy" class="py-1">
      Owner: <div class="inline font-thin">{{ submittedBy.displayName || submittedBy.email }}</div>
    </div>
    <div v-if="notes" class="py-1">
      Notes: <div class="inline font-thin">{{ notes }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitionDetails',
  props: {
    approvalState: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    loser: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
      default: '',
    },
    submittedBy: {
      type: Object,
      required: true,
    },
    tied: {
      type: Boolean,
      required: false,
    },
  },
}
</script>
