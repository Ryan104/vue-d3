# vue-d3
Data Driven Vue (Denver Vue Meetup)

This repo is meant to provide useful examples to get started with using D3 with Vue.

### Example 1: Simple Bar
* A very basic example that uses d3 to draw an SVG bar chart from hard coded data
* Shows how d3 can be used to append elements to the DOM based on a given dataset
* D3 and vanilla JS. Just open `index.html` in the brower

### Example 2: Simple Bar Olympics
* Uses D3 to render an SVG bar chart from an actual dataset within a Vue component
* Demonstraits the challenge of trying to use D3's DOM manipulation methods with Vue
* Uses D3's CSV parser
* D3 and Vue are imported in the HTML head but this needs to be run with a web server for the CSV to be accessable (`python -m SimpleHTTPServer`)

### Example 3: Simple Bar Vue
* A bar chart using the same olympic medal dataset from Ex 2 except only Vue directives are used to render the svg components intead of D3
* D3 csv parser is used
* Shows how vue directives and template can be used instead of D3 `append()`s
* Vue CLI 3.0 - `npm run serve`

### Example 4: Simple Pie Chart
* Basic example using some aditional D3 methods to draw a basic pie chart
* Demonstraits D3's usefulness for more than just data driven DOM manipulation

### Example 5: Simple Pie Chart Vue
* Vue component utilizing `d3-shape` to perform calculations needed for Vue to draw a pie chart
* Vue handles template, DOM; D3 handles calculations
* Vue CLI 3.0 - `npm run serve`

### Example ???
Please give d3 or vue/d3 a try! Submit a **pull request** to this repo with your visualization to serve as an example for others looking to learn D3 or use D3 within a Vue app!
