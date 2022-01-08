<template>
  <main id="app">
    <PxHeader></PxHeader>
    <router-view/>
  </main>
</template>
<script lang="ts">
import Vue from 'vue';
import PxHeader from '@/components/PxHeader.vue';

export default Vue.extend({
  name: 'Layout',
  components: {
    PxHeader,
  },
});
</script>

<style lang="scss">

</style>
