<template>
  <section>
    <h1 :class="coin.changePercent > 0 ? 'green' : 'red'">
      {{ coin.formatedName }}
      <span v-if="coin.changePercent > 0">👍</span>
      <span v-else>👎</span>
    </h1>
    <input type="text" v-model="coin.value">
    <p>{{ convertedValue }}</p>
    <span @click="toogleShowPrices">
      {{ showPrices === true ? 'Ocultar precios' : 'Ver precios' }}
    </span>
    <ul v-show="showPrices">
      <li
        v-for="(item, idx) in coin.pricesWithDays" :key="idx"
        :class="{
          orange: item.value === coin.price,
          green: item.value > coin.price,
          red: item.value < coin.price
        }"
      >
        <p>{{ item.day }} - {{ item.value }}</p>
      </li>
    </ul>
    <slot></slot>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['coin'],
  data() {
    return {
      showPrices: false as boolean,
      color: 'f4f4f4' as string,
    };
  },
  methods: {
    toogleShowPrices(): void {
      this.showPrices = !this.showPrices;
      this.$emit('change-color', 'ff0000');
    },
  },
  computed: {
    formatedName(): string {
      return `${this.coin.title} - ${this.coin.symbol}`;
    },
    convertedValue(): number {
      if (!this.coin.value) {
        return 0;
      }
      return this.coin.value / this.coin.price;
    },
  },
});
</script>
