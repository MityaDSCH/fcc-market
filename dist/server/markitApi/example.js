'use strict';

var MarkitApi = require('./markitApi.js');
MarkitApi = new MarkitApi();

// Lookup a stock symbol -------------------------------------------------------
var lookupResult = MarkitApi.lookupSymbol('microsoft', function(lookupResults) {
  console.log('lookup: ', lookupResults);
});

// Get a quote -----------------------------------------------------------------
var lookupResult = MarkitApi.getQuote('MSFT', function(stockQuote) {
  console.log('quote: ', stockQuote);
});

// Get an InteractiveChart -----------------------------------------------------
var chartRequest = {
  'Normalized': false,
  'NumberOfDays': 365,
  'DataPeriod': 'Day',
  'Elements': [{
    'Symbol': 'AAPL',
    'Type': 'price',
    'Params': ['c']
  }]
};

var chartResult = MarkitApi.getChart(chartRequest, function(interactiveChart) {
  console.log('chart: ', interactiveChart);
});
