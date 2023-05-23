
fetch('/pieChart')
	.then((response) =>{
		return response.json();
	})
	.then((numbers) =>{
		pieChart(numbers[0], numbers[1], numbers[2], numbers[3]);
	})
	

var McDo = function(e){
  return pieChart(330,532,272,837);
}

var TacoBell = function(e){
  return pieChart(180,275,64,353);
}

var BKing = function(e){
  return pieChart(182,354,197,420);
}

var Sonic = function(e){
  return pieChart(0,3,1,8);
}



function pieChart(west, midwest, northeast, south){
// set the dimensions and margins of the graph
d3.selectAll("svg").remove();
const width = 450,
    height = 450,
    margin = 40;


const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select("#pie_chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);


const data = {West: west, Midwest: midwest, Northeast:northeast, South:south}

// color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);

var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart
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



//var McDo = document.getElementById("McDo"); 
//var TacoBell = document.getElementById("Taco Bell"); 
//var Wendy = document.getElementById("Wendy's"); 


//McDo.addEventListener("click", drawscatter1);  
//TacoBell.addEventListener("click", drawscatter2); 
//Wendy.addEventListener("click", drawscatter3); 