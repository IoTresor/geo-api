"use strict";
exports.__esModule = true;
var Geolocation_1 = require("../src/Geolocation");
var express_1 = require("express");
var Particle_1 = require("../src/Particle");
var app = express_1["default"]();
var port = process.env.PORT || 4202;
var host = process.env.HOSTNAME || 'http://ec2-35-170-243-209.compute-1.amazonaws.com';
var pi = new Geolocation_1.GeoLocation('38.132.156.175');
var device = new Particle_1.Particle();
app.listen(port, function () {
    console.log("Listening on " + host + ":" + port + "..");
});
// Allows CORS. To be replaced by proper package or possibly authentication system?
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // having a wildcard here potientially gives a security risk?
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', function (req, res) {
    console.log('Success');
});
process.on('uncaughtException', function (err) {
    console.log(err);
    process.exit(1);
});
module.exports = app;
// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Rewritten in the OOJS style
