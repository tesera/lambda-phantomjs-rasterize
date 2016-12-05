#!/bin/sh

zip -r function.zip index.js rasterize.js node_modules phantomjs-linux

aws lambda update-function-code \
--function-name abmi-print \
--zip-file fileb://function.zip

rm function.zip
