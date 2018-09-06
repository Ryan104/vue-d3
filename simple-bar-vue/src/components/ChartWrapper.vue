<template>
  <BarChart :chart-data="chartData" />  
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios';
import { csvParse } from 'd3-dsv';
import BarChart from '@/components/BarChart.vue';

export default Vue.extend({
  components: {
    BarChart,
  },
  data() {
    return {
      chartData: [
        { value: 60 },
        { value: 40 },
        { value: 20 },
        { value: 80 },
        { value: 70 },
        { value: 80 },
        { value: 10 },
      ],
      rawData: [] as any[],
    }
  },
  mounted() {
    this.getData('@/assets/summer.csv');
  },
  methods: {
    getData(path: string) {
      axios.get('summer.csv').then(res => {
        const parsed = csvParse(res.data);
        this.rawData = parsed;
      });
    },
  },
});
</script>
