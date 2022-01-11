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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import api from '@/api/api';
/* TS */
import { Coin, HistoryItem } from '@/types/interfaces';

export default Vue.extend({
  name: 'CoinDetail',

  data() {
    return {
      asset: {} as Coin,
      history: [] as HistoryItem[],
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
    getAsset(id: string): void {
      const apiURL = `${this.URL}${id}`;
      // Promise.all([api.get()]);
      api.get(apiURL, {
        method: 'GET',
        redirect: 'follow',
      })
        .then((asset) => {
          this.asset = asset;
        });
    },
    getHistory(id: string): void {
      const now = new Date();
      const end = now.getTime();
      now.setDate(now.getDate() - 1);
      const start = now.getTime();
      const apiURL = `${this.URL}${id}/history?interval=h1&start=${start}&end=${end}`;
      api.get(apiURL, {
        method: 'GET',
        redirect: 'follow',
      })
        .then((history) => {
          this.history = history;
        });
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getAsset(id);
    this.getHistory(id);
  },
  // methods: {
  //   getCoin() {
  //     const id = this.$route.params.id

  //     Promise.all([api.getAsset(id), api.getAssetHistory(id)]).then(
  //       ([asset, history]) => {
  //         this.asset = asset
  //         this.history = history
  //       }
  //     )
  //   },
  // }
});
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
