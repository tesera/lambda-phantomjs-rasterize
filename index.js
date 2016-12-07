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
    if(!event.url) return callback("Could not find URL to rasterize.");
    execFile(path.resolve("phantomjs-linux"), [path.resolve('rasterize.js'), event.url, '/tmp/export.png', '2550px*1300px'], (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        callback(error, postProcessResource("/tmp/export.png", (file) => new Buffer(fs.readFileSync(file)).toString('base64')));
    });
};

