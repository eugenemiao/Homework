// from data.js
var tableData = data;

// Select the submit button
var submit = d3.select("#filter-btn");

// Complete the click handler for the form
submit.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input element to filter the data by date
    let inputDate = d3.select("#datetime").property('value');

    let inputCity = d3.select("#city").property('value');

    let inputState = d3.select("#state").property('value');

    let inputShape = d3.select("#shape").property('value');

    let filteredData = tableData.filter(onedata => onedata.datetime === inputDate 
                                                && onedata.city === inputCity
                                                && onedata.state === inputState
                                                && onedata.shape === inputShape);

    // Have columns [Date, City, State, Country, Shape, Duration, Comments]
    var tbody = d3.select("tbody");
    
    filteredData.forEach((UFOsighting) => {
        var row = tbody.append("tr");
        Object.entries(UFOsighting).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
});

