'use strict';

var Stocks = require('./stocks.model.js');
var querystring = require('querystring');
var getStock = require('./getStock.js');
var io = require('../socket.js');

exports.getStocks = function(req, res) {
  Stocks.find({}).exec(function(err, stocks) {
    if (!stocks) return res.status(401).send('Not found');
    res.json(stocks);
  });
};

exports.deleteStock = function(req, res) {
  var urlObj = querystring.parse(req.url.substr(12, req.url.length - 12));
  Stocks.findOneAndRemove({ name: urlObj.name }).exec(function(err, result) {
    if (err) {
      res.status(500).send('oops');
    } else {
      io.emitRemoveStock(result);
      res.status(200).send();
      res.end();
    }
  });
};

exports.addStock = function(req, res) {
  var urlObj = querystring.parse(req.url.substr(9, req.url.length - 9));
  getStock(urlObj.name, function(result, bool) {
    if (bool) {
      io.emitAddStock(result);
      res.status(200).send();
    } else {
      res.status(200).send(result);
    }
  });
};
