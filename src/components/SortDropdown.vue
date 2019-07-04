<template>
  <div class="relative pl-8" @click.stop>
    <div role="button" class="inline-block select-none" @click="open = !open">
      <slot name="link"></slot>
    </div>
    <div v-show="open" class="absolute pin-r mt-2 z-10" @click="open = !open">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      open: false,
    }
  },
}
</script>
