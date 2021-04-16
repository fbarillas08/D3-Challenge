// D3 TIMES Correlations Between Health Risks, Age, and Income
//
// Encapsulating the chart inside a function that automatically resizes.
      
// Load csv data and format it
d3.csv("assets/data/data.csv").then(function(demoData) {
  console.log(demoData)

  demoData.forEach(function(d) {
    d.obesity = +d.obesity;
    d.smokes = +d.smoke;
    d.healthcare = +d.healthcare;
    d.income = +d.income;    

  })  
    createChart(demoData);
})

// Define the Charting Function
function createChart(demoData){
  var margin = {
    top: 30,
    right: 40,
    bottom: 40,
    left: 50
  };

  var svgWidth = 900;
  var svgHeight = 450;

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // scales
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  x.domain(d3.extent(demoData, function (d) {
    return d.income;
  }));

  y.domain([0, d3.max(demoData, function (d) {
    return d.obesity;
  })]);

  // establishing the scatter plot

  var valueline = d3.line()
     .x(function (d) {
          return x(d.income);
     })
     .y(function (d) {
          return y(d.obesity);
     });

  // Append SVG   
  var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Plot Points
  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
  var path = svg.selectAll("dot")
     .data(demoData)
     .enter().append("circle")
     .attr("r", 8)
     .attr("cx", function (d) {
           return x(d.income);
     })
     .attr("cy", function (d) {
          return y(d.obesity);
     })
     .attr("stroke", "#1e2e22")
     .attr("stroke-width", 2.5)
     .attr("fill", "#d6f6ff")

  // Add Animation on Mouse Hover   
     .on('mouseover', function (d, i) {
      d3.select(this).transition()
           .duration('100')
           .attr("r", 15)
           .attr("fill","#f00a0d");

      div.transition()
        .duration(100)
        .style("opacity", 1);
        
      div.html(d.abbr)
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 15) + "px");  
      })

      .on('mouseout', function (d, i) {
      d3.select(this).transition()
           .duration('200')
           .attr("r", 8)
           .attr("fill", "#d6f6ff");

      div.transition()
        .duration('200')
        .style("opacity", 0);
  });
  // Add Axis
  
  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

  svg.append("g")
     .call(d3.axisLeft(y).tickFormat(function (d) {
          return d3.format(".2f")(d) + "%"  
        
  }));
}