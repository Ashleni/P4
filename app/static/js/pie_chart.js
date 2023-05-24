fetch('/pieChart')
  .then((response) => {
    return response.json();
  })
  .then((numbers) => {
    pieChart(numbers[0], numbers[1], numbers[2], numbers[3]);
  });

var McDo = function (e) {
  return pieChart(330, 532, 272, 837);
};

var TacoBell = function (e) {
  return pieChart(180, 275, 64, 353);
};

var BKing = function (e) {
  return pieChart(182, 354, 197, 420);
};

var Sonic = function (e) {
  return pieChart(0, 3, 1, 8);
};

var Wendy = function (e) {
  return pieChart(105, 215, 98, 313);
};

var Domino = function (e) {
  return pieChart(113, 64, 50, 118);
};

var Whataburger = function (e) {
  return pieChart(3, 0, 0, 85);
};

var Popeyes = function (e) {
  return pieChart(10, 10, 22, 13);
};

var Subway = function (e) {
  return pieChart(121, 88, 54, 141);
};

var PizzaHut = function (e) {
  return pieChart(56, 17, 5, 50);
};

var Arbys = function (e) {
  return pieChart(61, 205, 37, 214);
};

var ChickfilA = function (e) {
  return pieChart(12, 22, 9, 103);
};

var JackintheBox = function (e) {
  return pieChart(125, 15, 0, 61);
};

var Bojangles = function (e) {
  return pieChart(0, 0, 0, 126);
};

function pieChart(west, midwest, northeast, south) {
  // set the dimensions and margins of the graph
  d3.selectAll("svg").remove();
  const width = 600,
    height = 600,
    margin = 20;

  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3.select("#pie_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const data = { West: west, Midwest: midwest, Northeast: northeast, South: south };

  // Filter out regions with zero values
  const filteredData = Object.entries(data).filter(([region, value]) => value > 0);

  // color scale
  var color = d3.scaleOrdinal()
    .domain(filteredData.map(([region, value]) => region))
    .range(d3.schemeSet2);

  var pie = d3.pie()
    .value(function (d) { return d.value; });
  var data_ready = pie(filteredData.map(([region, value]) => ({ region, value })));

  var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Build the pie chart
  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function (d) { return (color(d.data.region)) })
   
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) { return d.data.region; })
    .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
    .style("text-anchor", "middle")
    .style("font-size", 15)
    .style("font-family", "Arial, sans-serif")
    .style("font-weight", "bold")
    .style("fill", "#000");
}