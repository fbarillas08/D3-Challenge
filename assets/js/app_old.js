// D3 TIMES Correlations Between Health Risks, Age, and Income
//
// Encapsulating the chart inside a function that automatically resizes.
function makeResponsive() {

    // var svgArea = d3.select("#scatter").select("svg");
    // if (!svgArea.empty()) {
    //     svgArea.remove();
    // }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .attr("class","chart");  

    

    






}



// Select body, append SVG area to it, and set the dimensions


svg.append("g")
  .attr("class","xText");

var xText = d3.select(".xText");
xText.append("text")
  .attr("y", -26)
  .attr("data-axis","x")
  .attr("class","aText x active test") //bolds selected category
  .text("% in Poverty");
function refreshtext(){
    xText.attr()
}


  // Load csv data
d3.csv("assets/data/data.csv").then(function(demoData) {
   //console.log(demoData)
    createChart(demoData);
})
// Create Chart
function createChart(chartData){
    console.log(chartData);

}