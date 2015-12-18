'use strict';

var Stocks = require('./stocks.model.js');
var querystring = require('querystring');

exports.getStocks = function(req, res) {
  Stocks.find({}).exec(function(err, stocks) {
    if (!stocks) return res.status(401).send('Not found');
    res.json(stocks);
  });
};

exports.deleteStock = function(req, res) {
  var urlObj = querystring.parse(req.url.substr(12, req.url.length - 12));
  Stocks.findOneAndRemove({ name: urlObj.name }).exec(function(err, result) {
    console.log(err, result);
    if (err) res.status(500).send('oops');
    res.status(200).send(result);
    res.end();
  });
};

exports.addStock = function(req, res) {
  console.log('add controller');
};
