var lambda = require('./index');

var event = {
  "url": "http://dev.abmi-map-portal.s3-website-us-east-1.amazonaws.com/land-cover/human-footprint/energy"
};

lambda.handler(event, null, console.log);
