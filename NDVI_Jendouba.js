// Define the region of interest (Jendouba, Tunisia)
var jendouba = ee.Geometry.Point(8.7806, 36.5000);
// Define the date range
var startDate = '2022-01-01';
var endDate = '2022-12-31';
// Load Sentinel-2 data
var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(jendouba)
  .filterDate(startDate, endDate)
  .first(); // Select the first image in the collection
  // Visualize the image on the map
Map.addLayer(sentinel2, {
  bands: ['B4', 'B3', 'B2'], // True-color visualization
  min: 0,
  max: 3000
}, 'Sentinel-2 Image');
// Center the map on Jendouba
Map.centerObject(jendouba, 12);
// Define the NIR and RED bands for Sentinel-2
var nirBand = 'B8'; // Near-Infrared
var redBand = 'B4'; // Red
// Calculate NDVI
var ndvi = sentinel2.normalizedDifference([nirBand, redBand]);

// Display the NDVI image
Map.addLayer(ndvi, {
  min: -1,
  max: 1,
  palette: ['blue', 'white', 'green']
}, 'NDVI');

// Center the map on Jendouba
Map.centerObject(jendouba, 12);