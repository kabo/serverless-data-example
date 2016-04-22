'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context, cb) {
  console.log(event);
  return lib.readings(event, context, cb);
};
