'use strict';

var Stocks = require('./stocks.model.js');

exports.getStocks = function(req, res) {
  Stocks.find({}).exec(function(err, stocks) {
    if (err) return next(err);
    if (!stocks) return res.status(401).send('Not found');
    res.json(stocks);
  });
};
