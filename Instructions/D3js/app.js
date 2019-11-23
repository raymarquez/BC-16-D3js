var svgWidth = 500;
var svgHeight = 500;


var margin1 = {
  top: 200,
  right: 10,
  bottom: 120,
  left: 90
};
var margin2 = {
    top: 700,
    right: 130,
    bottom: 300,
    left: 20
  };

var width1 = svgWidth - margin1.left - margin1.right;
var height1 = svgHeight - margin1.top - margin1.bottom;
var width2 = svgWidth - margin2.left - margin2.right;
var height2 = svgHeight - margin2.top - margin2.bottom;

var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin1.left}, ${margin1.top})`);


d3.csv("assets/data/data.csv").then(function(healthriskData) {
  
    console.log(healthriskData);

    healthriskData.forEach(function(data) {
        data.age = +data.age;
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
      });


    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthriskData, d => d.healthcare)])
      .range([0, width1]);
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthriskData, d => d.poverty)])
      .range([height1, 0]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height1})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

     var circlesGroup = chartGroup.selectAll("circle")
    .data(healthriskData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "pink")

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Hair length: ${d.healthcare}<br>Hits: ${d.poverty}`);
      });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin1.left + 40)
      .attr("x", 0 - (height1 / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width1 / 2}, ${height1 + margin1.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches)");


    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthriskData, d => d.smokes)])
      .range([0, width2]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthriskData, d => d.age)])
      .range([height2, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height2})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);


    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthriskData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", "15")
    .attr("fill", "pink")

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Hair length: ${d.smokes}<br>Hits: ${d.age}`);
      });


    chartGroup.call(toolTip);


    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })

      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });


    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin2.left + 40)
      .attr("x", 0 - (height2 / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width2 / 2}, ${height2 + margin2.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches).");
  }).catch(function(error) {
    console.log(error);
  });
