'use strict';
const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;
const sharp = require('sharp');

exports.handler = (event, context, callback) => {
    console.log(event);
    const phantomJSPath = path.resolve("phantomjs-linux");
    const rasterizePath = path.resolve('rasterize.js');
    const exportedImagePath = '/tmp/exported.png';
    const resizedImagePath = '/tmp/resized.png';

    if(!event.params.querystring.url) return callback("Could not find URL to rasterize.");

    const url = decodeURIComponent(event.params.querystring.url);
    const screenSize = event.params.querystring.size ? decodeURIComponent(event.params.querystring.screenSize) : '1440px*900px';
    const outWidth = event.params.querystring.outWidth ? event.params.querystring.outWidth.replace('px', '') : '';

    execFile(phantomJSPath, [rasterizePath, url, exportedImagePath, size], (err, stdout, stderr) => {
        let exported;
        if (err) {
            console.error(`exec error: ${err}`);
            return callback(err, {statusCode: 500, body: 'ERROR'});
        } else {
            exported = fs.readFileSync(exportedImagePath);
            if (outWidth) {
                sharp(exported)
                    .resize(outWidth, null)
                    .toFile(resizedImagePath, (err, info) => {
                        if (err) callback(err);
                        else callback(null, fs.readFileSync(resizedImagePath).toString('base64')); 
                    });
            } else {
                callback(null, exported.toString('base64'));
            }
        }
    });
};

