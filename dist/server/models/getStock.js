'use strict';

var Stock = require('./stocks.model.js');
var MarkitApi = require('../markitApi/markitApi.js');

module.exports = function(str, callback) {

  var api = new MarkitApi();

  //get a chart w/ close prices by day from today to one year ago
  var chartParams = {
    'Normalized': false,
    'NumberOfDays': 90,
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
      if (chart.Positions === null) {
        invalidStock(chart);
      } else {
        createStock(chart);
      }
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

      if (result.charAt(0) === '[') {
        callback(JSON.parse(result), false);
      } else {
        callback('Exceeded requests', false);
      }

    });
  }

  function invalidStock(result) {
    callback('Invalid stock', false);
  }

  api.getChart(chartParams, testResponse);

};
