'use strict';

var Stock = require('./stocks.model.js');

//remove all stocks and then...
Stock.find({}).remove().exec(function() {

  Stock.create({
    name: 'MSFT',
    acquired: new Date(),
    values: []
  }, {
    name: 'APL',
    acquired: new Date(),
    values: []
  }, {
    name: 'NYSE',
    acquired: new Date(),
    values: []
  }, {
    name: 'AMEX',
    acquired: new Date(),
    values: []
  }, function() {
    console.log('finished seed');
  });

});
