$(function() {

var d= new L.LayerGroup();
var center = new L.LatLng(42.3584308,-71.0597732);
var zoom = 14;
var t={
    url: "http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",
    options:{
        attribution:"Tiles from Mapquest",
        subdomains:["otile1","otile2","otile3","otile4"],
        attribution:"Tiles from Mapquest, Tile data from Open Street Map"
    },
};

t.o = new L.TileLayer(t.url,t.options);


var m = new L.Map('map',{
    center:center,
    zoom:zoom,
    layers:[t.o]
    });
var gj =  new L.GeoJSON();
m.addLayer(gj);
var bbox=m.getBounds().toBBoxString();
  $.get("_spatiallist/geojson/full?bbox="+bbox,parseJSONP,"JSONP");
function parseJSONP(data){
gj.addGeoJSON(data);

} 
});