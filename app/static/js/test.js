/*
//import("db.py")


// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#treemap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

/*
// Read data
d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv').then(function(data) {

  // stratify the data: reformatting for d3.js
  const root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity



          fetch('/restaurants')
            .then(response => response.json())
            .then(restaurants => {
              for (var i = 0; i < restaurants.length; i++) {
                var restaurant = restaurants[i];
                var name = restaurant[0];
                if (name.includes("McDonald's)) {  // Filter restaurants based on name
                  var lat = restaurant[1];
                  var lon = restaurant[2];
                  var circleMarker = L.circleMarker([lat, lon], {
                    radius: 8,
                    fillColor: "blue",
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }).addTo(map);
                  circleMarker.bindPopup(name);
                }
              }
            }
*/







/*
const restaurants = fetch('/restaurants')
restaurants.then(response => {
	return response.json();
	}).then(province => {
		console.log(province);
		mapped(restaurants);
	});
	
//end here

const restaurants = () => fetch('/restaurants')
	.then(response => response.json());
 
const showData = async () => {
	const result = await restaurants();
	console.log(result);
	mapped(result);
}
 
showData();
 
//response.json())
function mapped(restaurants){
// read json data
d3.json('/restaurants')
	.then(function(data) {

  // Give the data to this cluster layout:
  var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data


  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(4)
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#69b3a2");

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "15px")
      .attr("fill", "white")
})



}
*/









/*

const restaurants = () => fetch('/restaurants')
	.then(response => response.json());
 
const showData = async () => {
	const result = await restaurants();
	console.log(result);
	return result;
	 west = result[0];
	console.log(west);
	 midwest = result[1];
	 northeast = result[2];
	 south = result[3];
}
 
console.log(showData());
*/


// Create dummy data
fetch('/restaurants')
	.then((response) =>{
		return response.json();
	})
	.then((numbers) =>{
		pieChart(numbers[0], numbers[1], numbers[2], numbers[3]);
	})



function pieChart(west, midwest, northeast, south){
// set the dimensions and margins of the graph
const width = 450,
    height = 450,
    margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
const svg = d3.select("#treemap")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);


const data = {West: west, Midwest: midwest, Northeast:northeast, South:south}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
}