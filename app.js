var couchapp=require("couchapp");

function createCouch(url,db,user,pw){
	var nano = require("nano")("https://"+user+":"+pw+"@"+url);
	nano.db.create(db,function(e){
		if(!e){return setUpCouch(url,db,user,pw)}
	}

}

function setUpCouch(url,db,user,pw){
var doc = require("./couchapp.js");
var app = couchapp.createApp(doc,"https://"+user+":"+pw+"@"+url+"/"+db);
app.push(function(e){
if(!e){return permCouch(url,db,user,pw)}
}
}

function permCouch(url,db,user,pw){
var db = require("nano")("https://"+user+":"+pw+"@"+url+"/"+db);
db.insert({"admins":{"names":[user],"roles":["admin"]},"members":{"names":[],"roles":[]}},"_security",function(e){if(!e){
db.insert({"language":"javascript","validate_doc_update":"function(newDoc, oldDoc, userCtx) {  if (userCtx.roles.indexOf('_admin') !== -1) {    return;  } else {    throw({forbidden: 'Only admins may edit the database'});  }}"},"_design/auth",function(e){if(!e){return "done"}});
}});
}

function cleanJson(json){
var lnglat = json.location.points[0].poslist.split(" ");
json.geometry ={
	type:"Point",
	coordinates:[parseFloat(lnglat[1]),parseFloat(lnglat[0])]
}
return json;
}
function upJson(url,db,user,pw,json){
var j = require(json);
var db = require("nano")("https://"+user+":"+pw+"@"+url+"/"+db);
j.forEach(function(v){
var id = v.id;
var content = cleanJson(v);
db.insert(content,id);
});

}
exports.newC = createCouch(url,db,user,pw);
exports.up=upJson(url,db,user,pw,json);
