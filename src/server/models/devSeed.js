'use strict';

var Stock = require('./stocks.model.js');
var getStock = require('./getStock.js');

//remove all stocks and then...
Stock.find({}).remove().exec(function() {

  getStock('MSFT', function(result, bool) {
    if (bool) {
      console.log('seeding done');
    } else {
      result = JSON.parse(result);
      if (result.length > 0) {
        var options = result.map(function(stock) {
          return stock.Symbol;
        });
      } else {
        var options = 'Nevermind, no stocks found';
      }
      console.log('seed not found, did you mean one of these?', options);
    }
  });

});
