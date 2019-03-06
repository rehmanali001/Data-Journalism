// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 600;

var margin = {
    top: 40,
    right: 40,
    bottom: 80,
    left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var file = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201810DATA2/master/16_D3/Homework/Instructions/StarterCode/assets/data/data.csv?token=Ao9cE3aAy_SxkV564wGUA0NUWzY9uOvCks5ciKS4wA%3D%3D"

d3.csv(file).then(successHandle, errorHandle);

function errorHandle(error) {
    throw err;
}

function successHandle(statesData) {

    statesData.map(function (data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });

    var xLinearScale = d3.scaleLinear()
        .domain([8.1, d3.max(statesData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([20, d3.max(statesData, d => d.obesity)])
        .range([height, 0]);


    var bottomAxis = d3.axisBottom(xLinearScale)
        .ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale);




    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);


    var circlesGroup = chartGroup.selectAll("circle")
        .data(statesData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "13")
        .attr("fill", "#788dc2")
        .attr("opacity", ".75")



    var circlesGroup = chartGroup.selectAll()
        .data(statesData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.obesity))
        .style("font-size", "13px")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text(d => (d.abbr));

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}<br>Poverty: ${d.poverty}%<br>Obesity: ${d.obesity}% `);
        });

    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
        .on("mouseout", function (data) {
            toolTip.hide(data);
        });

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obese (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
}