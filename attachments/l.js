var d= new L.LayerGroup();
var center = new L.LatLng(42.3584308,-71.0597732);
var zoom = 16;
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
var d;
m.addLayer(gj);
gj.on("featureparse", function (e) {
    if (e.properties && e.properties.id){
        e.layer.bindPopup("<a href='/poi/"+e.properties.id+"?callback=popup' target='_blank'>"+e.properties.id+"</a>");
    }
});
var bbox=m.getBounds().toBBoxString();
  $.get("http://calvin.iriscouch.com/poi/_design/geo/_spatiallist/geojson/full?bbox="+bbox,parseJSONP,"JSONP");
function parseJSONP(data){
d=data;
gj.addGeoJSON(d);
};
function reparseJSONP(data){
gj.clearLayers()
d=data;
gj.addGeoJSON(d);
};
m.on("dragend",redo)
m.on("zoomend",redo)
function redo(){
bbox=m.getBounds().toBBoxString();
gj.clearLayers()
$.get("http://calvin.iriscouch.com/poi/_design/geo/_spatiallist/geojson/full?bbox="+bbox,reparseJSONP,"JSONP");
}


