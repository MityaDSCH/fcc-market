'use strict';

var Stock = require('./stocks.model.js');

//remove all stocks and then...
Stock.find({}).remove().exec(function() {

  Stock.create({
    name: 'MSFT',
    acquired: new Date(),
    interactiveChart: {}
  });

});
