<template>
  <section>
    <px-assets-table :assets="assets"></px-assets-table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
/* TS */
import { Coin } from '@/types/interfaces';
/* Components */
import PxAssetsTable from '@/components/PxAssetsTable.vue';
/* Api functions  */
import api from '@/api/api';

export default Vue.extend({
  name: 'Home',
  components: {
    PxAssetsTable,
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
      assets: [] as Coin[],
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
  created() {
    api.get('https://api.coincap.io/v2/assets/', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((assets) => {
        console.log(assets);
        this.assets = assets;
      });
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
