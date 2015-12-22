'use strict';

var Stock = require('./stocks.model.js');
var MarkitApi = require('../markitApi/markitApi.js');

module.exports = function(str, callback) {

  var api = new MarkitApi();

  //get a chart w/ close prices by day from today to one year ago
  var chartParams = {
    'Normalized': false,
    'NumberOfDays': 365,
    'DataPeriod': 'Day',
    'Elements': [{
      'Symbol': str,
      'Type': 'price',
      'Params': ['c']
    }]
  };

  var testResponse = function(result) {
    // if the reponse is JSON it was a success
    try {
      var chart = JSON.parse(result);
      createStock(chart);
    }
    // if not it responds w/ a 404 page
    catch(e) {
      lookupStock();
    }
  };

  function createStock(chart) {
    Stock.create({
      name: str,
      acquired: new Date(),
      interactiveChart: chart
    }, function(err, stocks) {
      if (err) {
        return err;
      }
      callback(stocks, true);
    });
  }

  function lookupStock() {
    api.lookupSymbol(str, function(result) {
      callback(JSON.parse(result), false);
    });
  }

  api.getChart(chartParams, testResponse);

};
