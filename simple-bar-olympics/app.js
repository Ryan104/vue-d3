const app = new Vue({
  el: '#app',
  data() {
    return {
      rawData: [],
      chartHeight: 400,
      chartWidth: 800,
      countryCode: 'USA',
      chart: null,
      groups: {},
      scale: 1,
    };
  },
  methods: {
    parseCSVData(path) {
      d3.csv(path, data => ({
        year: data.Year,
        countryCode: data.Country,
        medal: data.Medal,
        gender: data.Gender,
        city: data.City,
        sport: data.Sport,
        event: data.Event,
      })).then(data => {
        this.rawData = [...data];
      });
    },
    yearDataFactory(year, city) {
      return {
        year,
        city,
        bronzeEvents: new Set(),
        silverEvents: new Set(),
        goldEvents: new Set(),
      };
    },
    getTotalMedals(yearData) {
      const { bronzeEvents, silverEvents, goldEvents } = yearData;
      return bronzeEvents.size + silverEvents.size + goldEvents.size;
    },
    renderChart() {
      const chart = d3.select('.chart');

      console.log('groups:');

      const groups = chart.selectAll('g')
        .data(this.chartData);

      groups.enter()
        .append('g')
        .merge(groups)
        .attr('transform', (d, i) => `translate(${i * this.barWidth}, 0)`);

      // groups.exit().remove();

      console.log(groups);
      console.log('bars:');
      // const bars = groups.selectAll('rect');
      const bars = groups.append('rect')
      // bars.enter().append('rect').merge(bars)
        .attr('class', 'bar-rect')
        .attr('height', data => data.totalMedals * this.scale)
        .attr('width', this.barWidth - 1)
        .attr('transform', data => `translate(0, ${this.chartHeight - (data.totalMedals * this.scale)})`)
        .attr('fill', 'black');
      console.log(bars);
    },
    updateBars() {
      const chart = d3.select('.chart');
      const bars = chart.selectAll('.bar-rect').transition()
        .attr('height', data => data.totalMedals * this.scale)
        .attr('transform', data => `translate(0, ${this.chartHeight - (data.totalMedals * this.scale)})`);
    },
  },
  watch: {
    chartData() {
      if (this.chartData.length) {
        setTimeout(() => {
          this.updateBars();
        }, 0);
      }
    },
  },
  computed: {
    /** Format data, group by year, filter by country */
    chartData() {
      if (this.rawData && this.rawData.length) {
        const filteredByCountry = this.rawData.filter(d => d.countryCode === this.countryCode);

        const groupedByYear = filteredByCountry.reduce((groupedData, d) => {
          if (!groupedData[d.year]) {
            groupedData[d.year] = this.yearDataFactory(d.year, d.city);
          }

          switch (d.medal.toLowerCase()) {
            case 'bronze':
              groupedData[d.year].bronzeEvents.add(d.event);
              break;
            case 'silver':
              groupedData[d.year].silverEvents.add(d.event);
              break;
            case 'gold':
              groupedData[d.year].goldEvents.add(d.event);
              break;
            default:
              break;
          }

          return groupedData;
        }, {});

        const years = Object.keys(groupedByYear).sort();
        return years.map(year => ({
          ...groupedByYear[year],
          totalMedals: this.getTotalMedals(groupedByYear[year]),
        }));
      }

      return [];
    },
    barWidth() {
      if (this.chartData.length) {
        return this.chartWidth / this.chartData.length
      }
      return 0;
    },
  },
  mounted() {
    this.chart = d3.select('.chart');
    this.parseCSVData('./summer.csv');
  },
});
