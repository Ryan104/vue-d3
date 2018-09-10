<template>
  <svg :height="chartHeight" :width="chartWidth">
    <g :transform="chartTransform">
      <g v-for="(data, i) in chartData" :key="i" class="arc">
        <path :d="pathData" :fill="chartColors[i]"></path>
        <!-- add  and :dy="" -->
      </g>
    </g>
  </svg>
</template>

<!-- things to maybe add in again -->
<!--  -->
<!-- was on svg maybe? :radius="chartRadius" -->
<!-- <pie :sort="null" :value="data.population"> -->
<!-- </pie> -->
<!-- TODO: add this back in on text element>> :transform="textTransform"  -->
<!-- "translate(" + label.centroid(d) + ")" -->
<!-- <text fill="black">
          {{ data.age }}
        </text> -->

<script lang="ts">
  import Vue from 'vue';
  // import { d3, arc } from 'd3-path';

  export default Vue.extend({
    props: {
      chartData: {
        type: Array as () => { value:number }[],
        required: true,
      },
    },
    data() {
      return {
        chartHeight: 500,
        chartWidth: 960,
        chartColors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
        endY: 0,
        startX: 100,
        startY: 100,
        largeArcFlag: 100
      };
    },
    // methods: {
    //   pathData() {
    //     return d3.arc()
    //       .outerRadius(this.endX - 10)
    //       .innerRadius(0);
    //   }
    // },
    computed: {
      chartRadius(): number {
        return Math.min(this.chartWidth, this.chartHeight) / 2;
      },
      chartTransform(): string {
        return "translate(" + this.chartWidth / 2 + "," + this.chartHeight / 2 + ")";
      },
      endX(): number {
        return this.chartRadius - 10;
      },
      pathData(): string {
        // function(x, y, r, a0, a1, ccw)
        // M1.469576158976824e-14,-240A240,240,0,0,1,107.0492887034484,-214.803281604555L0,0Z
        //return `M${this.startX} ${this.startY},${this.endX},0,0,1,${this.largeArcFlag},${this.endY},0Z`;
        return `M${this.startX} ${this.startY}, A 1 1 0 ${this.largeArcFlag} 1 ${this.endX} ${this.endY}, L 0 0`;
      }
    }
  });
</script>

<style scoped>
  .arc text {
    font: 10px sans-serif;
    text-anchor: middle;
  }

  .arc path {
    stroke: #fff;
  }
</style>

