#!/bin/sh

curl \
   --request POST \
   -H "Accept: image/png" \
   -H "Content-type: application/json" \
   --data '{"url":"http://www.tesera.com/"}' \
   https://198sy86655.execute-api.us-east-1.amazonaws.com/dev > img-json.png
