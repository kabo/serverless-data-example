'use strict';
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var dynamodb = new AWS.DynamoDB();

module.exports.handler = function(event, context, cb) {
  var params = {
    TableName: "readings",
    ProjectionExpression: event.readings.join(","),
    KeyConditionExpression: "readingsource = :readingsource AND readingdatetime BETWEEN :from AND :to",
    ExpressionAttributeValues: {
      ":readingsource": { S: event.readingsource },
      ":from": { S: event.from },
      ":to": { S: event.to }
    }
  };
  console.log(params);
  dynamodb.query(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      return cb(err, null);
    } else {
      console.log(data);           // successful response
      return cb(null, data);
    }
  });
  //return cb(null, {
  //  message: 'Go Serverless! Your Lambda function executed successfully!'
  //});
};
