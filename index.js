const https = require('https');
const express = require('express');
const path = require('path');


let app = express();
let port = process.env.PORT || '4202';
let host = process.env.HOST || 'http://localhost';



app.listen(port, (error) => {
    console.log(`[SERVER] Live on ${host}:${port}`);
    domainUpdate();
    if (error) throw new Error(error);
});

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/", "index.html"));
    res.status(200);
});

function domainUpdate() {
    console.log(`[SERVER] Posting to Google's Servers...`);
    let username = process.env.USERNAME;
    let password = process.env.PASSWORD;
    let hostname = process.env.HOSTNAME;

    if (!username || !password || !hostname) throw new Error("Missing authentication input required");

    let url = `https://${username}:${password}@domains.google.com/nic/update?hostname=${hostname}`;

    const req = https.request(url, (res) => {
        console.log(`status - ${res.statusCode}`);
        console.log(`output - ${res.complete}`);
    }).on("error", (error) => {
        if (error) throw new Error(error);
    }).on('data', (d) => {
        console.log(d);
    });

    req.end();
}