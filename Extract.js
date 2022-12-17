const fs = require('fs')
const path = require('path')

const date = require('./data.json')
const MAPs_out = "_opcodes"
const DEFs_out = "_definitions"

if (!fs.existsSync(path.join(__dirname, MAPs_out))) {
	fs.mkdirSync(path.join(__dirname, MAPs_out))
}

if (!fs.existsSync(path.join(__dirname, DEFs_out))) {
	fs.mkdirSync(path.join(__dirname, DEFs_out))
}

function stringToBase64(str) {
	var base64Str = new Buffer.from(str, "utf-8").toString('base64')
	return base64Str
}

function base64ToString(base64Str) {
	var str = new Buffer.from(base64Str, 'base64').toString('utf-8')
	return str
}

function Extract() {
	// Save Maps
	var i=0
	for (var key in date["maps"]) { // for (var key in date.maps)
		console.log(`Export-Map [${++i}]: ` + path.join(__dirname, MAPs_out, "protocol." + key + ".map"))
		
		var map_File = fs.createWriteStream(path.join(__dirname, MAPs_out, "protocol." + key + ".map"))
		for (var mapName in date["maps"][key]) {
			map_File.write(`${mapName} ${date["maps"][key][mapName]}\n`)
		}
		map_File.end()
	}
	// Save Defs
	var j=0
	for (var key in date["protocol"]) { // for (var key in date.protocol)
		console.log(`Export-Def [${++j}]: ` + path.join(__dirname, DEFs_out, key))
		
		var def_File = fs.createWriteStream(path.join(__dirname, DEFs_out, key))
		def_File.write(base64ToString(date["protocol"][key]))
		def_File.end()
	}
}

Extract()