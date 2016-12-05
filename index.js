'use strict';
const path = require('path');
const phantomjsLambdaPack = require('phantomjs-lambda-pack');
const exec = phantomjsLambdaPack.exec;

// exports.handler = (event, context, callback) => {
    exec([path.resolve('rasterize.js'), 'http://localhost:3000/land-cover/human-footprint/energy', 'export.png', '2550px*1300px'], (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`phantom version: ${stdout}`);
        console.log(`Should have no error: ${stderr}`);

        callback(error, 'fin!!');
    });
// };
