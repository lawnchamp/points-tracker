<template>
  <!-- this could be a functional component -->
  <div class="h-12">
    <button
      class="text-xs font-semibold rounded-full px-4 py-1 my-2 float-right
            leading-normal bg-white border border-green text-green
            hover:bg-green hover:text-white"
      @click="publishAll"
    >Publish all</button>
  </div>
</template>

<script>

export default {
  methods: {
    publishAll() {
      this.$store.dispatch('publishAll')
    },
  },
}
</script>

