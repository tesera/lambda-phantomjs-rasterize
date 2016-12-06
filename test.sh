#!/bin/sh

curl \
    --request POST \
    -H "Accept: image/png" \
    -H "Content-type: application/x-www-form-urlencoded" \
    --data "url=http://dev.abmi-map-portal.s3-website-us-east-1.amazonaws.com/land-cover/human-footprint/energy" \
    https://198sy86655.execute-api.us-east-1.amazonaws.com/prod > img-form.png


curl \
    --request POST \
    -H "Accept: image/png" \
    -H "Content-type: application/json" \
    --data '{"url":"http://dev.abmi-map-portal.s3-website-us-east-1.amazonaws.com/land-cover/human-footprint/energy"}' \
    https://198sy86655.execute-api.us-east-1.amazonaws.com/prod > img-json.png
