<template>
  <svg :height="chartHeight" :width="chartWidth">
    <g :transform="chartTransform">
      <g v-for="(data, i) in pieData" :key="i" class="arc">
        <path :d="getPath(data)" :fill="chartColors[i]"></path>
        <text :transform="getLabelTransform(data)" dy="0.35em">{{ chartData[i].age }}</text>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { pie, arc, PieArcDatum, DefaultArcObject } from 'd3-shape';

  export default Vue.extend({
    props: {
      chartData: {
        type: Array as () => { population:number, age:string }[],
        required: true,
      },
    },
    data() {
      return {
        chartHeight: 500,
        chartWidth: 960,
        chartColors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
      };
    },
    methods: {
      getPath(arcData: DefaultArcObject): string|null {
        const arcGenerator = arc().outerRadius(this.chartRadius - 10).innerRadius(0);
        const path = arcGenerator(arcData);
        return path;
      },
      getLabelTransform(data: DefaultArcObject): string {
        const arcGenerator = arc().outerRadius(this.chartRadius - 40).innerRadius(this.chartRadius - 40);
        const arcCenterCoords = arcGenerator.centroid(data);
        return `translate(${arcCenterCoords})`;
      },
    },
    computed: {
      chartRadius(): number {
        return Math.min(this.chartWidth, this.chartHeight) / 2;
      },
      chartTransform(): string {
        return "translate(" + this.chartWidth / 2 + "," + this.chartHeight / 2 + ")";
      },
      pieData(): PieArcDatum<number | { valueOf(): number; }>[] {
        const data: number[] = this.chartData.map(d => d.population);
        return pie()(data);
      },
    }
  });
</script>

<style scoped>
  .arc text {
    font: 12px sans-serif;
    text-anchor: middle;
  }

  .arc path {
    stroke: #fff;
  }
</style>

