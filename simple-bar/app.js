const chartHeight = 400;
const chartWidth = 600;
const axisSpace = 30;

const chartData = [10, 4, 15, 22];

/* SVG chart area */
const chart1 = d3.select('.bar-1')
  .attr('height', chartHeight)
  .attr('width', chartWidth);

/** Add a group for each data point */
const groups = chart1.selectAll('g')
  .data(chartData)
  .enter()
  .append('g')
  .attr('transform', (d, i) => `translate(${i * (chartWidth / chartData.length)}, 0)`);

/* Draw bars */
const barWidth = chartWidth / chartData.length;
const bars = groups.append('rect')
  .attr('class', 'bar-rect')
  .attr('height', data => data * 10)
  .attr('width', barWidth - 1)
  .attr('transform', data => `translate(0, ${chartHeight - (data * 10) - axisSpace})`)
  .attr('fill', 'black');

/* Draw labels */
const labels = groups.append('text')
  .text(data => data)
  .attr('transform', `translate(${barWidth / 2}, ${chartHeight})`)
  .attr("font-family", "sans-serif")
  .attr("font-size", "20px")
  .attr('fill', 'black');
