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
  this.name = this.name.toUpperCase();
  next();
});

module.exports = mongoose.model('Stock', Stock);
