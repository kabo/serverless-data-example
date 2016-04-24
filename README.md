# serverless-data-example

## Setup
* get an AWS account
* install serverless (npm install serverless -g)
* clone this repo
* run npm install
* create a DynamoDB table "readings" with the partition key "readingsource" (string) and sort key "readingdatetime" (string)
* populate the DynamoDB table
  * use ./transform-readings.py <input.csv> to create batch-*.json
  * run for i in batch-*.json; do aws dynamodb batch-write-item --request-items "file://$i"; done

### To run localy
* npm install serverless-serve http-server -g
* run serverless serve start
* cd gui; grunt serve

### To run in AWS
* run serverless dash to deploy the functions
* grunt build; aws s3 sync dist s3://[s3-bucket]/ --acl public-read

