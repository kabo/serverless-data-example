# serverless-data-example

## Setup
* get an AWS account
* install serverless (npm install serverless -g)
* clone this repo
* create a DynamoDB table "readings" with the partition key "source" (string) and sort key "datetime" (string)
* populate the DynamoDB table
  * use ./transform-readings.py <input.csv> to create batch-*.json
  * run for i in batch-*.json; do aws dynamodb batch-write-item --request-items "file://$i"; done

### To run localy
* npm install serverless-serve http-server -g
* run serverless serve start
* run http-server

### To run in AWS
* run serverless dash to deploy the functions
* upload contents of the gui folder to an S3-bucket 

