'use strict';

var querystring = require('querystring');
var http = require('http');

var MarkitApi = function() {};

MarkitApi.prototype.lookupSymbol = function(str, callback) {
  var hostname = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?' +
                  querystring.stringify({input: str});
  getApi(hostname, callback);
};

MarkitApi.prototype.getQuote = function(str, callback) {
  var hostname = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?' +
                  querystring.stringify({symbol: str});
  getApi(hostname, callback);
};

MarkitApi.prototype.getChart = function(params, callback) {
  var obj = JSON.stringify(params);
  var hostname = 'http://dev.markitondemand.com/MODApis/Api/v2/' +
                 'InteractiveChart/json?parameters=' + obj;
  getApi(hostname, callback);
};

function getApi(hostname, callback) {
  http.get(hostname, function(res) {
    var body = '';
    res.on('data', function(d) {
        body += d;
    });
    res.on('end', function() {
      callback(body);
    });
    res.on('error', function(e) {
      console.log(e.message);
    });
  });
}

module.exports = MarkitApi;
