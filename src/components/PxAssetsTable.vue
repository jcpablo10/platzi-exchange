<template>
  <table class="max-w-xs max-w-sm max-w-md max-w-lg max-w-xl max-w-2xl max-w-3xl max-w-4xl">
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
        v-for="asset in assets"
        :key="asset.id"
      >
        <td>
          <img
            class="w-8"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLocaleLowerCase()}@2x.png`"
            :alt="asset.name"
          />
        </td>
        <td>
          #{{ asset.rank }}
        </td>
        <td>
          <router-link
            :to="'coin/' + asset.id"
            class="hover:underline text-green-600"
          >
            {{  asset.name }} - {{asset.symbol}}
          </router-link>
        </td>
        <td>
          {{ asset.priceUsd | dollar }} USD
        </td>
        <td>
          {{ asset.marketCapUsd | dollar }} USD
        </td>
        <td :class="asset.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'">
          {{ asset.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoinDetail(asset.id)">
            Ver detalles
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
/* TS */
import { Coin } from '@/types/interfaces';
/* Componentes */
import PxButton from './PxButton.vue';

export default Vue.extend({
  name: 'PxAssetsTable',
  components: {
    PxButton,
  },
  props: {
    assets: {
      type: Array as () => Coin[],
      default: () => [],
    },
  },
  methods: {
    goToCoinDetail(id: string): void {
      this.$router.push({ name: 'coin-detail', params: { id } });
      // console.log(id);
    },
  },
});
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
