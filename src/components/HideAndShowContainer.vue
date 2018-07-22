<template>
  <div class="container mx-auto max-w-md px-4 py-1">
    <div class="bg-white rounded-lg shadow px-3">
      <div @click="show = !show" class="py-3">
        <div class="inline capitalize text-l text-grey-darker">
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
