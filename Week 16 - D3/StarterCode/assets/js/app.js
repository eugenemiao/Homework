// @TODO: YOUR CODE HERE!

//parseInt to grab out the integer, grab the width integer to the scatter
var width = parseInt(d3.select('#scatter').style("width"));

//define the eheight of the graph
// Ideal to play around with the size
var height = width - width/3.9;

// margin for spacing of graph
var margin = 20;

// space for placement of words
var labelArea = 110;

// padding for the text at the bottom and left axes
var paddingBot = 40;
var paddingLeft = 40;

// Create the canvas for the graph
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

// define circle radius
var circRadius;
function crGet() {
    if(width <= 530) {
        circRadius = 5;
    }
    else {
        circRadius = 10;
    }
}
crGet();

// Labels for axes

//Bottom axis

svg.append("g").attr("class", "xText");
// reference xText
var xText = d3.select(".xText");

// give xText a transform property
function xTextRefresh() {
    xText.attr("transform", "translate(" + 
    ((width - labelArea)/2 + labelArea) + ", " + 
    (height - margin - paddingBot) + ")");
}
xTextRefresh()

// We use xText to append 3 text names for the axis
// 1) Poverty
xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");

// 2) Age
xText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Age (median)");

// 3) Income
xText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Household Income (median)");

// Left Axis
var leftTextX = margin + paddingLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

// add a second label group
svg.append("g").attr("class", "yText");

// Refer to yText
var yText = d3.select(".yText");

//smilar to xTextRefresh
function yTextRefresh() {
    yText.attr(
        "transform", 
        "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
    );
}

yTextRefresh();

// We use yText to append 3 text names for the axis
// 1) Obesity
yText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Obesity (%)");

// 2) Smokes
yText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes (%)");

// 3) Lacks Healthcare
yText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "lacks healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Lacks Healthcare (%)");

//Read in our data
d3.csv("assets/data/data.csv").then(function(data) {
    visualize(data);
});

//create visualization function
// purpose of function is to manipulate all the visual elements
function visualization(theData) {
    var curX = "poverty";
    var curY = "obesity";

    // we need empty variables to store the max and min values
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    // create a tooltip functionality
    var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([40, -60])
        .html(function(d) {
            var theX;
            // grab the state name
            var theState = "<div>" + d.state + "</div>";
            // grab the y values key and value
            var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
            // If x key is poverty
            if (curX === "poverty") {
                // grab the x key and its value
                theX = "<div>" + curX + ": " + d[curX] + "%</div>";
            } 
            else {
                theX = "<div>" + curX + ": " + parseFloat(d[curX]).toLocaleString("en") + "%</div>";
            }

            // display what we captured
            return thestate + theX + theY
        });

    svg.call(toolTip);

    // create a function to find the maximum and minimum values of the columns
    //max and min of Y & X axes
    function xMinMax() {
        xMin = d3.min(theData, function(d) {
            return parseFloat(d[curX]) * 0.90;
        });
        xMax = d3.max(theData, function(d) {
            return parseFloat(d[curX]) * 1.10;
        });
    }

    function yMinMax() {
        yMin = d3.min(theData, function(d) {
            return parseFloat(d[curY]) * 0.90;
        });
        yMax = d3.max(theData, function(d) {
            return parseFloat(d[curY]) * 1.10;
        });
    }

    // change classes and appearance when a different label text is clicked
    function labelChange(axis, clickText) {
        //switch the currently active to inactive
        d3
            .selectAll(".aText")
            .filter("." + axis)
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);
            
    }
}

