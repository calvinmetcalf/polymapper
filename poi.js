var j = require("JSONSelect");
var u = require("underscore");
var cradle = require('cradle');

function cleanObj(o){
	for(var key in o){
		if(o[key]===null){
			delete o[key]
		}else if(u.isArray(o[key])){
			if(o[key].length==0){
				delete o[key]
		}else{cleanArray(o[key])}
		}else{clean(o[key])}
	}
}

function clean(thing){
	if(u.isArray(thing)){
		cleanArray(thing)
	}else if(u.isObject(thing)){
		cleanObj(thing)
	}
}

function cleanArray(ar){
	if(u.isArray(ar)){
		ar.forEach(function(v){
			if(u.isArray(v)){
				cleanArray(v);
			}else if(u.isObject(v)){
				cleanObj(v)}
		})
	};
}

function author(poi){
	var u ={};
	function uv(k,v){if(!u[v]){u[v]=k}};
	function cb(a){if(a){uv(a,a.myid);a=a.myid;}}
	j.forEach(".author",poi,function(s){cb(s)});
	return u;
}

function up(db,json){
	var d = new(cradle.Connection)().database(db);
	clean(json);
	var a = author(json);
	json.forEach(function(v){
		v._id=v.id;
		var lnglat = v.location.points[0].poslist.split(" ");
		v.geometry ={type:"Point",coordinates:[parseFloat(lnglat[1]),parseFloat(lnglat[0])]}
	});
	for(var id in a){d.save("a/"+id,a[id])};
	d.save(json);
}

exports.up=up;


