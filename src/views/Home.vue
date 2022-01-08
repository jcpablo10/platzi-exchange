<template>
  <div class="home" :style="{'background-color': '#' + color}">
    <coin-detail :coin="bitcoin" v-on:change-color="updateColor">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Maxime vel provident a ab. Commodi culpa ut, saepe veniam,
          est accusamus aspernatur libero fugit pariatur,
          impedit officia eveniet expedita voluptate odit!
        </p>
    </coin-detail>
    <!-- <img :src="imageUrl" :alt="title"> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CoinDetail from '@/components/CoinDetail.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    CoinDetail,
  },
  data() {
    return {
      bitcoin: {
        title: 'Bitcoin' as string,
        symbol: 'BTC' as string,
        imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' as string,
        changePercent: 10 as number,
        price: 853435 as number,
        prices: [1000, 1200, 1300, 400] as number[],
        pricesWithDays: [
          { day: 'Lunes', value: 800 },
          { day: 'Martes', value: 1800 },
          { day: 'Miércoles', value: 1500 },
          { day: 'Jueves', value: 1550 },
          { day: 'Viernes', value: 2000 },
          { day: 'Sábado', value: 22000 },
          { day: 'Domingo', value: 1900 },
        ],
        value: 0 as number,
      },
      color: 'ff0000' as string,
    };
  },
  methods: {
    updateColor(): void {
      this.color = this.color
        .split('')
        .reverse()
        .join('');
    },
  },
  /* Las propiedades computadas son funciones que siempre devueven un valor */
  /* el nombre */
  watch: {
    showPrices(nuevo, viejo): void {
      console.log('viejo ', viejo);
      console.log('nuevo ', nuevo);
    },
  },
});
</script>
<style>
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  .orange {
    color: orange;
  }
</style>
