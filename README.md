# lambda-phantomjs-rasterize

We built this function because we needed a simple print strategy for web maps. The function uses PhantomJS and the rasterize script packaged with the PhantomJS examples. We use the function with the AWS Gateway API in request method passthrough mode.

#### Usage
argument | default | description
---------|---------|------------
url | required | url to print
screenSize | 1440px*900px | size of the screen to print
outWidth | 0 | resize width + will conform to screenSize aspect ration

#### Deploying
You will need to have installed and configured the AWS CLI. Change the info in `deploy.sh` with your function name and region. You should depoy the code from an Amazon AMI since some aspect of the project depends on which architecture the build is ran on.

```terminal
$ git clone git@github.com:tesera/lambda-phantomjs-rasterize.git
$ cd lambda-phantomjs-rasterize
$ # update deploy.sh with your info
$ ./deploy.sh
```
