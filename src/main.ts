import Vue from 'vue';
/* Filters */
import '@/filters/filters';
/* Componenets */
import { VueSpinners } from '@saeris/vue-spinners';
import VueApexCharts from 'vue-apexcharts';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';
import App from './App.vue';

Vue.use(VueApexCharts);
Vue.use(VueSpinners);

Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
