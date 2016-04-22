'use strict';
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;
var dynamodb = new AWS.DynamoDB();

module.exports.readings = function(event, context, cb) {
  var params = {
    TableName: "readings",
    ProjectionExpression: event.readings,
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
      //console.log(data);           // successful response
      var result = {
        Items: data.Items.map(unmarshalItem),
        Count: data.Count
      };
      return cb(null, result);
    }
  });
};
