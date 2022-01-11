import Vue from 'vue';
import numeral from 'numeral';

Vue.filter('dollar', (value: number) => {
  if (!value) {
    return '$ 0';
  }
  return numeral(value).format('($ 0.00a)');
});

Vue.filter('percent', (value: number) => {
  if (!value) {
    return '0%';
  }
  return `${Number(value).toFixed(2)}%`;
});
