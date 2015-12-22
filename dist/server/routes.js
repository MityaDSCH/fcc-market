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
    });

  app.route('/api/delete/:name')
    .get(function(req, res) {
      StockHandler.deleteStock(req, res);
    });

  app.route('/api/add/:name')
    .get(function(req, res) {
      StockHandler.addStock(req, res);
    });

  app.route('/api')
    .post(function(req, res) {
      StockHandler.addStock(req, res);
    });
};
