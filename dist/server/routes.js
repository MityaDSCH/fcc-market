'use strict';

var StockHandler = require('./models/stocks.controller.js');

module.exports = function (app) {
  app.route('/')
    .get(function(req, res) {
      res.sendFile('./client/index.html');
    });

  app.route('/api')
    .get(function(req, res) {
      StockHandler.getStocks(req, res);
    })
};
