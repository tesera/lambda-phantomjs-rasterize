#!/bin/sh

# curl \
#     --request POST \
#     -H "Accept: image/png" \
#     -H "Content-Type: image/png" \
#     --data-binary "@apigateway.png" \
#     https://198sy86655.execute-api.us-east-1.amazonaws.com/prod > apigateway-thumb.png


curl \
    --request POST \
    -H "Accept: image/png" \
    -H "Content-Type: application/json" \
    --data "url=http://dev.abmi-map-portal.s3-website-us-east-1.amazonaws.com/land-cover/human-footprint/energy" \
    https://198sy86655.execute-api.us-east-1.amazonaws.com/prod