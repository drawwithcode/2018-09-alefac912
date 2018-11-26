// Antipode Map
// Global variables
var myMap;
var canvas;
var myLoc;
var myAntiLocLat;
var myAntiLocLng;
// New Mappa instance
var mappa = new Mappa('MapboxGL', 'pk.eyJ1IjoiYWxlZmFjIiwiYSI6ImNqb2gxNng3ZzBsMnQzcmp0MHFvcDA1MmgifQ.5R-2WwIkDstCs6vl0AyIDA');
// Map options
var options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  style: 'mapbox://styles/alefac/cjoytqk365rpp2rplfy74tz7u',
  pitch: 50
}

function preload() {
  // Preload of the current location
  myLoc = getCurrentPosition();
}

function setup() {
  // Canvas declaration
  canvas = createCanvas(windowWidth, windowHeight);
  // Antipode location
  myAntiLocLat = -1 * myLoc.latitude;
  myAntiLocLng = myLoc.longitude - 180;
  // Location centered between myLoc and myAntiLoc
  options.lat = myAntiLocLat + myLoc.latitude;
  options.lng = myAntiLocLng + 90;
  // Creation of the map, with the options declared
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

function draw() {
  clear();
  angleMode(DEGREES);
  // myLoc
  var point = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
  fill(255);
  textSize(15);
  text('Your location', point.x + 15, point.y + 15)
  ellipse(point.x, point.y, 20 + (5 * sin(frameCount)));
  // myAntiLoc
  var antiPoint = myMap.latLngToPixel(myAntiLocLat, myAntiLocLng);
  text('Your antipode', antiPoint.x + 15, antiPoint.y + 15)
  ellipse(antiPoint.x, antiPoint.y, 20 + (5 * sin(frameCount)));
  // Title
  fill(0, 0, 255);
  textStyle(BOLD);
  textSize(25);
  text("Antipodes Map - What's there on the other side?", 30, 30);
}
