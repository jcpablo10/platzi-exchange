<template>
  <div>
    <section class="w-full flex justify-center content-center center">
      <px-assets-table :assets="assets"></px-assets-table>
    </section>
    <section class="w-full flex justify-center content-center center">
      <ul class="flex my-6">
        <li v-for="(number, idx) in itemsPerPage" :key="number">
          <button
            v-if="currentPage != number"
            @click="getAssets(idx)"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              {{ number }}
            </button>
          <button
            v-else
            disabled
            class="bg-gray-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
              {{ number }}
            </button>
        </li>
      </ul>
    </section>
  </div>
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
      itemsPerPage: 10 as number,
      pages: 10 as number,
      currentPage: 1 as number,
    };
  },
  methods: {
    updateColor(): void {
      this.color = this.color
        .split('')
        .reverse()
        .join('');
    },
    getAssets(offset: number): void {
      const apiURL = `https://api.coincap.io/v2/assets/?limit=${this.pages}&offset=${offset * this.pages}`;
      api.get(apiURL, {
        method: 'GET',
        redirect: 'follow',
      })
        .then((assets) => {
          this.assets = assets;
          this.currentPage = offset + 1;
        });
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
    this.getAssets(0);
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
