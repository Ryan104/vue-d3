<template>
  <svg :height="chartHeight" :width="chartWidth">
    <g v-for="(data, i) in chartData" :key="i" fill="black" :transform="`translate(${i * barWidth}, 0)`">
      <rect :height="data.totalMedals" :width="barWidth" :transform="`translate(0, ${chartHeight - data.totalMedals})`"></rect>
      <text :transform="`translate(${barWidth / 4}, ${chartHeight - data.totalMedals - 5})`" fill="black">
        {{ data.totalMedals }}
      </text>
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    chartData: {
      type: Array as () => { value:number }[],
      required: true,
    },
  },
  data() {
    return {
      chartHeight: 300,
      chartWidth: 800,
    };
  },
  computed: {
    barWidth(): number {
      return (this.chartWidth / this.chartData.length) - 1;
    },
  },
});
</script>

<style scoped>

</style>

