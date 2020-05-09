import { GeoLocation } from "./Geolocation";
import express from "express";

const app = express();

const port = process.env.PORT || 4202;
const host = process.env.HOST || "http://localhost";

const pi = new GeoLocation("152.10.249.31");

// Grabs GeoIP
setTimeout(() => {
  console.log(`${JSON.stringify(pi.getGeoIp(), null, 4)}`);
}, 5000);

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}..`);
});

// render files
app.use(express.static("."));

module.exports = app;

// Reference
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// Rewritten in the OOJS style
