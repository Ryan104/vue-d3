<template>
  <svg :height="chartHeight" :width="chartWidth">
    <!-- Pie Chart Group -->
    <g :transform="chartTransform">
      <!-- Slice Groups -->
      <g v-for="(data, i) in chartData" :key="i" class="arc">
        <!-- Slice Arc -->
        <path :d="arcPaths[i]" :fill="chartColors[i%6]"></path>
        <!-- Slice Label -->
        <text :transform="labelTransforms[i]" dy="0.35em">
          {{ data.age }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { pie as d3Pie, arc as d3Arc, PieArcDatum, DefaultArcObject, Arc } from 'd3-shape';

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
    computed: {
      /** Transform attr for centering the chart */
      chartTransform(): string {
        return "translate(" + this.chartWidth / 2 + "," + this.chartHeight / 2 + ")";
      },
      /** The max radius of the pie chart depending on the chart's dimensions */
      chartRadius(): number {
        return Math.min(this.chartWidth, this.chartHeight) / 2;
      },
      /** An initialized d3 Arc Generator function for the pie slices */
      pieArcGenerator(): Arc<any, DefaultArcObject> {
        const arcGen = d3Arc().outerRadius(this.chartRadius - 10).innerRadius(0);
        return arcGen;
      },
      /** An initialized d3 Arc Generator function for the labels */
      labelArcGenerator(): Arc<any, DefaultArcObject> {
        const arcGen = d3Arc().outerRadius(this.chartRadius - 40).innerRadius(this.chartRadius - 40);
        return arcGen;
      },
      /** Arc objects used by arg generator to generate path info */
      pieArcObjects(): PieArcDatum<number | { valueOf(): number; }>[] {
        const populationData: number[] = this.chartData.map(d => d.population);

        // Use d3 pie generator to get data objects used by arc generator
        return d3Pie()(populationData);
      },
      /** Path inputs for the path tag to draw the pie slices */
      arcPaths(): string[] {
        // Use arc generator to calculate slice shapes for <path> tag
        const arcs = this.pieArcObjects.map((arcDatum): string => this.pieArcGenerator(arcDatum));
        return arcs;
      },
      /** Transforms for positioning pie slice labels */
      labelTransforms(): string[] {
        const sliceCenterCoords = this.pieArcObjects.map((arcDatum) => this.labelArcGenerator.centroid(arcDatum));
        const transforms = sliceCenterCoords.map(center => `translate(${center})`)
        return transforms;
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

