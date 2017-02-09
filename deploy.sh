#!/bin/sh

zip -r function.zip index.js rasterize.js node_modules phantomjs-linux

aws lambda update-function-code \
--function-name rasterize \
--zip-file fileb://function.zip \
--region us-west-2

rm function.zip
