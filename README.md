# leaflet-challenge
<h2>Challenge 15: a visualisation tool using USGS data to view information concerning earthquakes worldwide.</h2>

<p>This challenge displays the data from USGS representing the last 7 days' of earthquake activity from around the world.</p>

<p>The website link used is:</p>
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

<h3>The requirements of the exercise is to:</h3><ol>
  <li>Load tilelayers for the map</li>
  <li>Connect to GeoJSON API using d3</li>
  <li>Visualise the earthquakes with data points with markers (in this case circle markers) whose size is scaled to earthquake magnitude</li>
  <li>The colour of the markers to change according to depth recorded for each earthquake data point</li>
  <li>Each data point to have a popup giving details of the magnitude, location and depth of the earthquake</li>
  <li>To provide a legend showing the depth of each earthquake and thier corresponding colour.</li></ol>


<p><b>Image of the output produced by the code is shown below.</b></p>


<img width="1079" alt="image" src="https://github.com/RicT1969/leaflet-challenge/assets/124494379/4715e46c-e6d2-4886-be85-71f9e634431b">

<h2>Code Specification</h2>

<p>This code fetches earthquake data from the USGS API, creates circle markers for each earthquake, styles them based on their magnitude and depth, adds them to the map as an overlay layer, and includes a legend for the depth ranges.</p>

<h3>Step 1: Create Base Map Layers</h3><ul>
  <li>Create a Leaflet map object with the id "map" as the target container.</li>
  <li>Set the center coordinates to Darwin, Australia (-12.4637, 130.8444).</li>
  <li>Set the initial zoom level to 4.</li>
  <li>Define two base layers: "Street Map" and "Topographic Map" using OpenStreetMap and OpenTopoMap tile layers, respectively.</li>
  <li>Store the base layers in the baseMaps object.</li>
  <li>Set the "Street Map" layer as the default layer for the map.</li></ul>

<h3>Step 2: Set up Styling for the Earthquake Marker</h3>
  <li>Define a function getMarkerRadius(mag) to calculate the marker radius based on the earthquake magnitude.</li><ul>
    <li>Adjust the scaling factor as needed.</li>
    <li>Use a simple linear scaling function: Math.sqrt(mag) * scalingFactor.</li></ul>
  <li>Define a function getColor(depth) to determine the color of the earthquake marker based on the depth.</li><ul>
    <li>Use conditional statements to assign a color based on the depth range.</li>
    <li>Return the corresponding color code.</li></ul>
<b>Note:</b> These functions will be used later to style the circle markers for each earthquake.</ul>

<h3>Step 3: Get Data for Earthquakes and Add to Map</h3>
  <li>Define a variable queryUrl to store the API endpoint URL for retrieving earthquake data from the USGS API.</li>
  <li>Define a function createFeatures() to get the earthquake data and add it to the map.</li><ul>
    <li>Use d3.json() to perform a GET request to the queryUrl.</li>
    <li>Create a GeoJSON layer for the earthquake data using L.geoJSON.</li><ul>
      <li>Use the pointToLayer option to customize the marker for each earthquake.</li>
      <li>Inside pointToLayer function:</li><ul>
        <li>Retrieve the earthquake depth, magnitude, and place from the feature properties.</li>
        <li>Define the style for the circle marker based on the magnitude and depth using the functions defined in Step 2.</li>
        <li>Create a circle marker at the earthquake's location using L.circleMarker.</li>
        <li>Bind a popup to the circle marker containing information about the earthquake.</li>
        <li>Return the circle marker.</li></ul></ul>
    <li>Define a function createLegend() to create a legend for the earthquake depth.</li><ul>
      <li>Create a Leaflet control in the bottom-right position.</li>
      <li>Define the depth ranges and corresponding legend colors.</li>
      <li>Construct the legend content using HTML and CSS.</li>
      <li>Add the legend control to the map.</li></ul>
    <li>Create overlay maps object with the "Earthquakes" layer.</li>
    <li>Add the layer control to the map, including the base layers and overlay layers.</li>
    <li>Add the "Earthquakes" layer to the map.</li>
    <li>Add the legend to the map.</li></ul></ul>
  <li>Call the createFeatures() function to initiate the process of fetching data and adding it to the map.</li></ul>
  <p>The code would be improved by making the colour scale dynamic based on the range of depth contained in the data - given time this was not pursued, although Chroma.js library (https://gka.github.io/chroma.js/) and an alternative using d3 - https://github.com/d3/d3-scale-chromatic, provide good sources.
  <p>In order to avoid CORS policy violation a local server was run using the live server provided by Visual Studio (http://127.0.0.1:5500/), and the Python server (localhost 8000)</p>

<h2>Sources</h2><ul>
<li>pointToLayer function in a GeoJSON options object when creating the GeoJSON layers - https://leafletjs.com/examples/geojson/</li>
<li>AskBCS Learning Assistant</li>
<li>Richard Soos, a fellow student on course who gave pointers:<ul></li>
  <li>to investigate the pointToLayer function</li>
  <li>to defining depth as a variable outside of the circleMarker function, so that it could be called wihtin the template literal</li>
  <li>Defining map elements as seperate functions and then calling them with the createFeatures() function at the end of the code.</li>
  


