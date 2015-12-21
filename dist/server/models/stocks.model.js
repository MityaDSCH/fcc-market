'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var api = new require('../markitApi/markitApi.js');
api = new api();

var Stock = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  acquired: String,
  interactiveChart: Object
});

Stock.pre('save', function(next) {

  var chart = {};

  var responseHandler = function(result) {
    this.interactiveChart = result;

    next();
  };

  // console.log('pre-bind: ', this);

  api.getChart({
    'Normalized': false,
    'NumberOfDays': 365,
    'DataPeriod': 'Day',
    'Elements': [{
      'Symbol': this.name,
      'Type': 'price',
      'Params': ['c']
    }]
  }, responseHandler.bind(this));
  
});

module.exports = mongoose.model('Stock', Stock);
