<template>
  <div>
    <h1>Pie Chart</h1>
    <PieChart v-if="chartData.length" :chart-data="chartData" />
    <div>
      <label>Label</label>
      <input type="text" v-model="newAge" />
      <label>Data</label>
      <input type="number" v-model="newPopulation" />
      <button @click="addData()">ADD</button>
    </div>
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
      newAge: null as string|null,
      newPopulation: null as number|null,
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
    },
    addData() {
      if (this.newAge && this.newPopulation) {
        this.rawData.push({
          age: this.newAge,
          population: this.newPopulation,
        });
        this.newAge = null;
        this.newPopulation = null;  
      }
    },
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
