import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_URL_BASE: 'https://api.coincap.io/v2/assets/' as string,
    isLoading: true as boolean,
  },
  mutations: {
    setLoading(state, payload): void {
      state.isLoading = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoading: (state) => state.isLoading,
  },
});
