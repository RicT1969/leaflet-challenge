// Step 1: create base map layers, using Darwin as a centre to give a localised inital visualisation
//of the Indoneasian faultline with Australia included
//###########################################################################################
// Create map object with streetmap layer to display on load.
let myMap = L.map("map", {
  center: [
    -12.4637, 130.8444 
     ],
  zoom: 4,
});

  // Create base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// set streetmap as default layer:
street.addTo(myMap);


//###########################################################################################
//Step 2 set up styling for the earthquake markert
//###########################################################################################

// Define a function to calculate the marker radius based on magnitude
function getMarkerRadius(mag) {
  // Adjust the scaling factor as needed
  const scalingFactor = 8;
 
 // Calculate the radius using a simple linear scaling function
  return Math.sqrt(mag) * scalingFactor;
}

// Define a function to determine the color based on Depth
function getColor(depth) {
  if (depth >= 300) {
    return '#800000';
  } else if (depth >= 200) {
    return '#b22222';
  } else if (depth >= 75) {
    return '#dc143c'; 
  } else if (depth >= 50) {
    return '#ff4500';
  } else if (depth >= 25) {
    return '#ff6347';
  } else if (depth >= 10) {
    return '#f08080';
  } else {return '#ffa07a'};
}

//###########################################################################################
//Step 3 get data for earthquakes and add to map
//###########################################################################################

//Get earthquake data from the UUGS API and store API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Function to get data
function createFeatures() {

  // Perform a GET request to the query URL/
  d3.json(queryUrl).then(function (earthquakeData) {
    

      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    let earthquakes = L.geoJSON(earthquakeData, {
          pointToLayer: function (feature, latlng) {
            //Define depth, magnitude and place for circleMarker
            const depth = feature.geometry.coordinates[2];
            const place = feature.properties.place;
            const mag = feature.properties.mag;

            
          // Define what the circle marker will look likeat the earthquake's location
          const circleMarkerStyle = {
            radius: getMarkerRadius(mag),
            fillColor: getColor(depth),
            color: 'black', 
            weight: 1,
            opacity: 1,
            fillOpacity: 0.75
          };
    
          //Set popup attributes
          const information = `<h2>${feature.properties.place}</h2><hr><h2>Eartquake Magnitude: ${feature.properties.mag}</h2><hr><h3>Depth: ${depth} meters<h3><hr></h2><p>${new Date(feature.properties.time)}</p>`;
          
          // bind popup to circlemarker
          const quakeMarker = L.circleMarker(latlng, circleMarkerStyle);
          quakeMarker.bindPopup(information);
          return quakeMarker;
        }
    });

    function createLegend() {
      const legend = L.control({ position: 'bottomright' });
    
      const depthRanges = ['<10', '10-25', '25-50', '50-75', '75-100', '100-200', '>300'];
      const legendColors = ['#ffa07a', '#f08080', '#ff6347', '#ff4500', '#dc143c', '#b22222', '#800000'];
    
      // Define the legend content      
      legend.onAdd = function (map) {
         // Create a div element for the legend
        const div = L.DomUtil.create('div', 'legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.border = "1px solid black";
        div.style.opacity = '0.9';
    
        let labels = '<strong>Depth of earthquake (m)</strong><br>';
    
        for (let i = 0; i < depthRanges.length; i++) {
          const color = legendColors[i];
          const label = depthRanges[i];
          labels +=
            '<i style="background:' + color + '"></i> ' +
            label + '<br>';
        }
    
        div.innerHTML = `
        <div style="background-color: white; padding: 10px; border: 1px solid black;">
          <strong>Depth of Earthquake (m)</strong><br>
          <table>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #ffa07a;"></div></td>
              <td>&lt;10</td>
            </tr>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #f08080;"></div></td>
              <td>10-25</td>
            </tr>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #ff6347;"></div></td>
              <td>25-50</td>
            </tr>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #ff4500;"></div></td>
              <td>50-75</td>
            </tr>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #dc143c;"></div></td>
              <td>75-100</td>
            </tr>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #b22222;"></div></td>
              <td>100-200</td>
            </tr>
            <tr>
              <td><div style="width: 20px; height: 20px; background-color: #800000;"></div></td>
              <td>&gt;300</td>
            </tr>
          </table>
        </div>
        `;
  
      return div;
    };
      legend.addTo(myMap);
    }
      // Create overlay maps object.
    let overlayMaps = {
      Earthquakes: earthquakes
    };

    // Add the earthquake layer to the layer control.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // Add earthquake layer to the map.
    earthquakes.addTo(myMap);

    // Add the legend to the map
    createLegend();
  });
}

// Add the earthquake layer to the layer control
createFeatures();