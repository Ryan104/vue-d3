<template>
  <div>
    <h1>Pie Chart</h1>
    <PieChart v-if="chartData.length" :chart-data="chartData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios';
import { csvParse } from 'd3-dsv';
import PieChart from '@/components/PieChart.vue';

export default Vue.extend({
  components: {
    PieChart
  },
  data() {
    return {
      rawData: [] as any[],
    }
  },
  mounted() {
    this.getData('@/assets/data.csv');
  },
  methods: {
    getData(path: string): void {
      axios.get('data.csv').then(res => {
        const parsed = csvParse(res.data);
        this.rawData = parsed;
      });
    }
  },
  computed: {
    chartData(): any[] {
      if (this.rawData.length) {
        return this.rawData;
      }

      return [];
    },
  },
});
</script>
