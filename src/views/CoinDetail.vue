<template>
  <div class="flex-col">
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >Cambiar</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="
                  text-center
                  bg-white
                  focus:outline-none
                  focus:shadow-outline
                  border
                  border-gray-300
                  rounded-lg
                  py-2
                  px-4
                  block
                  w-full
                  appearance-none
                  leading-normal
                "
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
    </template>
    <div class="container mx-auto px-4">
      <apexchart
        width="100%"
        type="line"
        :options="chart.options"
        :series="chart.series">
      </apexchart>
    </div>
    <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr class="border-b" v-for="(market,idx) in markets" :key="`${idx}${market.baseId}`">
          <td>
            <b>{{ market.exchangeId }}</b>
          </td>
          <td>{{ market.priceUsd }}</td>
          <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
          <td>
            <px-button />
            <a class="hover:underline text-green-600" target="_blanck"></a>
          </td>
        </tr>
      </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import api from '@/api/api';
/* TS */
import { Coin, HistoryItem, Market } from '@/types/interfaces';
/* Componentes */
import PxButton from '@/components/PxButton.vue';

export default Vue.extend({
  name: 'CoinDetail',
  components: {
    PxButton,
  },
  data() {
    return {
      asset: {} as Coin,
      history: [] as HistoryItem[],
      historyStart: 0 as number,
      historyEnd: 0 as number,
      markets: [] as Market[],
      chart: {
        options: {
          chart: {
            id: 'Detail',
          },
          xaxis: {
            categories: [] as string[],
          },
        },
        series: [{
          name: 'series-1',
          data: [] as number[],
        }],
      },
    };
  },

  computed: {
    ...mapState({ URL: 'API_URL_BASE' }),
    min(): number {
      const values: number[] = this.history.map((item) => parseFloat(item.priceUsd));
      return Math.min(...values);
    },
    max(): number {
      const values: number[] = this.history.map((item) => parseFloat(item.priceUsd));
      return Math.max(...values);
    },
    avg(): number {
      return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length;
    },
  },
  methods: {
    setHistoryRange(): void {
      const now = new Date();
      this.historyEnd = now.getTime();
      now.setDate(now.getDate() - 1);
      this.historyStart = now.getTime();
    },
    fillChart(): void {
      const values: number[] = this.history.map((item) => parseFloat(item.priceUsd));
      this.chart.series = [{ name: 'Titulo de prueba', data: values }];
    },
    getCoinDetail(coin: string) {
      Promise.all([
        api.getAsset(coin),
        api.getHistory(coin, this.historyStart, this.historyEnd),
        api.getMarkets(coin),
        api.getAsset2(coin),
      ])
        .then(([
          asset,
          history,
          markets,
          asset2,
        ]) => {
          this.asset = asset;
          this.history = history;
          this.fillChart();
          this.markets = markets;
          console.log(asset2);
        })
        .catch(() => console.log('Falló'))
        .finally(() => {
          console.log('Finally executed');
        });
    },
  },
  created() {
    const { id } = this.$route.params;
    this.setHistoryRange();
    this.getCoinDetail(id);
  },
});
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
