// https://mappa.js.org/docs/getting-started.html


// Create an instance of Leaflet
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

// Lets change the map tiles to something with more contrast
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  // style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function preload() {
  // Load the data;
}

function setup() {
  canvas = createCanvas(800, 800);
  myMap = mappa.tileMap(options);
  // Overlay the canvas over the tile map
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');


  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawMeteorites);

  fill(200, 100, 100);
  stroke(100);

}

function draw() {
}

// Draw the meteorites
function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
}


function drawPoint(){
  clear();

  const nigeria = myMap.latLngToPixel(11.396396, 5.076543);
  // Using that position, draw an ellipse
  ellipse(nigeria.x, nigeria.y, 20, 20);
}


function drawPositions() {
  // Clear the canvas
  clear();

  for (let i = 0; i < trackingData.getRowCount(); i++) {
    // Get the lat/lng of each position
    const latitude = Number(trackingData.getString(i, 'x'));
    const longitude = Number(trackingData.getString(i, 'y'));

    const countNumber = Number(trackingData.getString(i, 'track_seg_point_id'));

    // console.log(latitude)
    // console.log(countNumber)

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      console.log(pos)
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = trackingData.getString(i, 'track_seg_point_id');
      console.log(size);
      size = map(countNumber, 558, 1800, 1, 125) + myMap.zoom();
      ellipse(pos.lat, pos.lng, size, size);
      // console.log(pos.x, pos.y, size)
    }
  }
}
