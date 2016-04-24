# serverless-data-example

## About

A REST API running on AWS Lambda, which means that it only costs money when it's in use and basically infinitely scaleable. The API gets its data from AWS DynamoDB. This API is coupled with an Angular website hosted on S3. No servers to care for, no OS patching, super cheap and if coupled with cloudfront would be very fast anywhere in the world. What's not to like?

The API expects four parameters:

* readingsource (e.g. Station1)
* from (e.g. 2014-02-10 05:00:00)
* to (e.g. 2014-02-18 04:00:00)
* readings (e.g. readingdatetime,tmp or readingdatetime,tmp,rh,wsp)

So it's possible to fetch data from different sources and different time periods.

## Technologies used

* [Serverless](http://serverless.com/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [AWS API Gateway](http://aws.amazon.com/api-gateway/)
* [AWS DynamoDB](http://aws.amazon.com/dynamodb/)
* [AWS S3](http://aws.amazon.com/s3/)
* [Angular.js](https://angularjs.org/)
* [d3.js](https://d3js.org/)

## Setup

* get an AWS account
* create a DynamoDB table "readings" with the partition key "readingsource" (string) and sort key "readingdatetime" (string)

```bash
sudo pip install aws-cli
aws configure # enter your credentials
sudo npm install serverless -g
git clone https://github.com/kabo/serverless-data-example.git
cd serverless-data-example
npm install
```

* now populate the DynamoDB table

```bash
./transform-readings.py <input.csv> # this creates a bunch of batch-*.json
for i in batch-*.json; do aws dynamodb batch-write-item --request-items "file://$i"; done
```

### To run localy

```bash
npm install serverless-serve -g
serverless serve start # runs your lambda functions locally
cd gui
grunt serve # will open your browser and take you to the frontend
```

### To run in AWS

* create an s3 bucket and enable static website hosting
* change the url on line 57 in gui/app/scripts/directives/simplelinechart.js to point to your endpoint from step 1 below before running grunt build

```bash
serverless dash deploy # deploy the function and the endpoint
cd gui
grunt build
aws s3 sync dist s3://[s3-bucket]/ --acl public-read
```

