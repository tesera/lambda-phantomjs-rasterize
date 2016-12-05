'use strict';
const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;

const postProcessResource = (resource, fn) => {
    let ret = null;
    if (resource) {
        if (fn) {
            ret = fn(resource);
        }
        try {
            fs.unlinkSync(resource);
        } catch (err) {
            // Ignore
        }
    }
    return ret;
};

exports.handler = (event, context, callback) => {
    console.log(event);
    execFile(path.resolve("phantomjs-linux"), [path.resolve('rasterize.js'), 'http://dev.abmi-map-portal.s3-website-us-east-1.amazonaws.com/land-cover/human-footprint/energy', '/tmp/export.png', '2550px*1300px'], (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        callback(error, postProcessResource("/tmp/export.png", (file) => new Buffer(fs.readFileSync(file)).toString('base64')));
    });
};

