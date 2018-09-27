const API_KEY = "pk.eyJ1IjoibWlhb21peDE3IiwiYSI6ImNqbWswbzFzaTA2ZDkzcXA5a29xbHk0OHIifQ.aYU3Pz1Vn1xDrQJRKxCsug";

// satellite map
var satMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: API_KEY
});

// light map
var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// outdoors map
var outdoorsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

// basemap dictionary
var baseMaps = {
    "Satellite": satMap,
    "Light": lightMap,
    "Outdoors": outdoorsMap
  };

// Earthquake and fault line details
var quake = new L.layerGroup();
var faultLine = new L.layerGroup();

var overlays = {
    "Fault Lines": faultLine,
    "Earthquakes": quake
  };

// layer control box
L.control.layers(baseMaps, overlays).addTo(map);

//json for all day daily earthquakes
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"), function(data) {
    
    // function for color and radius of circles based on magnitude
    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: quakeColor(feature.properties.mag),
          color: "#000000",
          radius: quakeRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
    
      // Color of earthquake based on magnitude
      function quakeColor(magnitude) {
        switch (true) {
        case magnitude > 5:
          return "#ea2c2c";
        case magnitude > 4:
          return "#ea822c";
        case magnitude > 3:
          return "#ee9c00";
        case magnitude > 2:
          return "#eecc00";
        case magnitude > 1:
          return "#d4ee00";
        default:
          return "#98ee00";
        }
      }
    
      // Radius of earthquake based on magnitude
      function quakeRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
    
        return magnitude * 4;
      }
    
      // Here we add a GeoJSON layer to the map once the file is loaded.
      L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        },
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
      }).addTo(quake);

      quake.addTo(map);
    
      // Here we create a legend control object.
      var legend = L.control({
        position: "bottomright"
      });
    
      // Then add all the details for the legend
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
    
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
    
        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            "<i style='background: " + colors[i] + "></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
      };
    
      // Finally, we our legend to the map.
      legend.addTo(map);
    };

    
};