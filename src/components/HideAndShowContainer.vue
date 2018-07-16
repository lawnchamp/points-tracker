<template>
  <div class="container mx-auto max-w-md px-4 py-1">
    <div class="bg-white rounded-lg shadow p-2">
      <div @click="show = !show">
        <div class="font-semibold inline capitalize text-2xl">
          <slot name="title"></slot>
        </div>
      </div>
      <div v-show="show" class="border-t">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialShow: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      show: this.initialShow
    }
  }
}
</script>
