<template>
  <button
    @click="buttonClick"
    class="
      bg-transparent
      hover:bg-green-500
      text-green-700
      font-semibold
      hover:text-white
      py-2
      px-2
      border
      border-green-500
      hover:border-transparent
      rounded"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    buttonClick(): void {
      this.$emit('custom-click');
    },
  },
});
</script>
