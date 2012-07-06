var couchapp=require("couchapp");

function createCouch(url,db,user,pw){
	var nano = require("nano")("https://"+user+":"+pw+"@"+url);
	nano.db.create(db,function(e){
		if(!e){return setUpCouch(url,db,user,pw)}
	})

}

function setUpCouch(url,db,user,pw){
var nano = require("nano")("https://"+user+":"+pw+"@"+url);
nano.db.replicate("http://calvin.iriscouch.com/geo",db,function(e){
if(!e){return permCouch(url,db,user,pw)}
});

}

function permCouch(url,db,user,pw){
var db = require("nano")("https://"+user+":"+pw+"@"+url+"/"+db);
db.insert({"admins":{"names":[user],"roles":["admin"]},"members":{"names":[],"roles":[]}},"_security",function(e){if(!e){
db.insert({"language":"javascript","validate_doc_update":"function(newDoc, oldDoc, userCtx) {  if (userCtx.roles.indexOf('_admin') !== -1) {    return;  } else {    throw({forbidden: 'Only admins may edit the database'});  }}"},"_design/auth",function(e){if(!e){return "done"}});
}});
}

function cleanJson(json){var rjson=json;var lnglat = json.location.points[0].poslist.split(" ");rjson.geometry ={type:"Point",coordinates:[parseFloat(lnglat[1]),parseFloat(lnglat[0])]};return rjson;};
function upJson(url,db,user,pw,json){
var d =require('nano')("https://"+user+":"+pw+"@"+url+"/"+db);
var a = require(json);
some(a.length%100,a);
function some(n,a){while(n>0){var j = a.pop();d.insert(cleanJson(j),j.id);n--}return a.length;}
this.some=some;
}
exports.newC = createCouch;
exports.up=upJson;
