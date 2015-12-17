'use strict';

var Stock = require('./stocks.model.js');

//remove all stocks and then...
Stock.find({}).remove().exec(function() {

  Stock.create({
    name: 'ex1',
    acquired: new Date(),
    values: []
  }, {
    name: 'ex2',
    acquired: new Date(),
    values: []
  }, {
    name: 'ex3',
    acquired: new Date(),
    values: []
  }, {
    name: 'ex4',
    acquired: new Date(),
    values: []
  }, function() {
    console.log('finished seed');
  });

});
