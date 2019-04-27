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
    <div>
      <div v-if="isAdmin && submittedBy" class="py-1">
        Owner: <div class="inline font-thin">{{ submittedBy.email }}</div>
      </div>
      <div v-if="notes" class="py-1">
        Notes: <div class="inline font-thin">{{ notes }}</div>
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
      required: true,
    },
    approvalState: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: Object,
      required: true,
    },
    notes: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
