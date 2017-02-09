# lambda-phantomjs-rasterize

We built this function because we needed a simple print strategy for web maps. The function uses PhantomJS and the rasterize script packaged with the PhantomJS examples. We use the function with the AWS Gateway API in request method passthrough mode.

The function will use PhantomJS to render the url passed in and take a screen grab of the rendered page. You can control the size of the screen grap by passing in an optional screenSize argument. You can also resize the screengrab by passing in a outWidth that will respect the aspect ratio of the passed in or default screenSize. The function will return a base64 encoded string of the image.

#### Usage
argument | default | description
---------|---------|------------
url | required | url to print
screenSize | 1440px*900px | size of the screen to print
outWidth | 0 | resize width + will conform to screenSize aspect ration

#### Deploying
You will need to have installed and configured the AWS CLI in order to execute the deploy script. Change the info in `deploy.sh` with your function name and region. You should depoy the code from an Amazon AMI since some aspect of the project depends on which architecture the build is ran on. I usually ssh into a small Amazon work instance and run the deploy from there.

```terminal
$ git clone git@github.com:tesera/lambda-phantomjs-rasterize.git
$ cd lambda-phantomjs-rasterize
$ # update deploy.sh with your info
$ ./deploy.sh
```

#### Using the function with AWS API Gateway
We have also included our AWS API configuration swagger JSON file with AWS API Gateway extentions. You can import the swagger file directly using the AWS API GAteway import tool from the AWS API Gateway console. With binary support enabled for `image/png` the API will convert the base64 string to its binary equivalent if the incomming requests includes an `Accept: image.png` header. Otherwise it will default to retuning the base64 encoded string.
