'use strict';
const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;

exports.handler = (event, context, callback) => {
    console.log(event);
    const phantomJSPath = path.resolve("phantomjs-linux");
    const rasterizePath = path.resolve('rasterize.js');
    const tmpImagePath = '/tmp/export.png';
    
    if(!event.params.querystring.url) return callback("Could not find URL to rasterize.");

    const url = decodeURIComponent(event.params.querystring.url);
    const size = event.params.querystring.size || '1440px*900px';

    execFile(phantomJSPath, [rasterizePath, url, tmpImagePath, size], (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return callback(err, {statusCode: 500, body: 'ERROR'});
        } else {
            callback(null, fs.readFileSync(tmpImagePath).toString('base64'));
        }
    });
};

